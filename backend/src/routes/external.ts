import { Router } from 'express';
import axios from 'axios';

const router = Router();

// Spotify / Last.fm proxy for Now Playing track
router.get('/spotify/now-playing', async (req, res) => {
  const {
    LASTFM_API_KEY,
    LASTFM_USERNAME,
    SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET,
    SPOTIFY_REFRESH_TOKEN
  } = process.env;

  console.log('Now Playing API called. LASTFM_API_KEY:', LASTFM_API_KEY, 'LASTFM_USERNAME:', LASTFM_USERNAME);

  const fallbackTrack = {
    title: 'White Ferrari',
    artist: 'Frank Ocean',
    albumArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=150&h=150&q=80',
    url: 'https://open.spotify.com/track/2LMkwUjfZ4e6JTYYqyqu23',
    isPlaying: false
  };

  // 1. Try Last.fm API if configured (Free, no Premium required, scrobbles Spotify)
  if (LASTFM_API_KEY && LASTFM_USERNAME) {
    try {
      const lastfmUrl = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${encodeURIComponent(LASTFM_USERNAME)}&api_key=${LASTFM_API_KEY}&format=json&limit=1`;
      const response = await axios.get(lastfmUrl);
      const tracks = response.data?.recenttracks?.track;

      if (tracks && tracks.length > 0) {
        const currentTrack = tracks[0];
        const isPlaying = currentTrack['@attr']?.nowplaying === 'true';
        const title = currentTrack.name || fallbackTrack.title;
        const artist = currentTrack.artist?.['#text'] || currentTrack.artist?.name || fallbackTrack.artist;
        
        let albumArt = fallbackTrack.albumArt;
        if (Array.isArray(currentTrack.image)) {
          const xlImg = currentTrack.image.find((img: any) => img.size === 'extralarge') || currentTrack.image.find((img: any) => img.size === 'large');
          if (xlImg && xlImg['#text']) {
            albumArt = xlImg['#text'];
          }
        }

        const trackUrl = currentTrack.url || fallbackTrack.url;

        return res.status(200).json({
          title,
          artist,
          albumArt,
          url: trackUrl,
          isPlaying
        });
      }
    } catch (err) {
      console.error('[Last.fm API Error] Failed to fetch recent tracks:', err);
    }
  }

  // 2. Try Spotify API if Last.fm not configured
  if (SPOTIFY_CLIENT_ID && SPOTIFY_CLIENT_SECRET && SPOTIFY_REFRESH_TOKEN) {
    try {
      const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');
      const tokenResponse = await axios.post(
        'https://accounts.spotify.com/api/token',
        new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: SPOTIFY_REFRESH_TOKEN,
        }),
        {
          headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      const { access_token } = tokenResponse.data;

      const nowPlayingRes = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (nowPlayingRes.status === 200 && nowPlayingRes.data && nowPlayingRes.data.item) {
        const { item, is_playing } = nowPlayingRes.data;
        return res.status(200).json({
          title: item.name,
          artist: item.artists.map((a: any) => a.name).join(', '),
          albumArt: item.album.images[0]?.url || fallbackTrack.albumArt,
          url: item.external_urls.spotify,
          isPlaying: is_playing
        });
      }
    } catch (err) {
      console.error('[Spotify API Error] Failed to fetch currently playing track:', err);
    }
  }

  // 3. Fallback mock response if no API keys are active or requests failed
  return res.status(200).json(fallbackTrack);
});

// GitHub Contributions proxy
router.get('/github/contributions', async (req, res) => {
  const { GITHUB_TOKEN, GITHUB_USERNAME } = process.env;
  if (!GITHUB_TOKEN) {
    return res.status(404).json({ message: 'GitHub token not configured' });
  }

  const requestedYear = req.query.year ? parseInt(req.query.year as string) : null;
  let from = null;
  let to = null;
  if (requestedYear) {
    from = `${requestedYear}-01-01T00:00:00Z`;
    to = `${requestedYear}-12-31T23:59:59Z`;
  }

  const query = `
    query($username: String!, $from: DateTime, $to: DateTime) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionYears
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
                color
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await axios.post(
      'https://api.github.com/graphql',
      {
        query,
        variables: { 
          username: GITHUB_USERNAME || 'geetikavasistha-01',
          from,
          to
        }
      },
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const collection = response.data?.data?.user?.contributionsCollection;
    const calendar = collection?.contributionCalendar;
    if (!calendar) {
      throw new Error('Invalid GitHub response');
    }

    res.status(200).json({
      totalContributions: calendar.totalContributions,
      weeks: calendar.weeks,
      years: collection.contributionYears
    });
  } catch (error) {
    res.status(404).json({ message: 'GitHub proxy query failed' });
  }
});

export default router;
