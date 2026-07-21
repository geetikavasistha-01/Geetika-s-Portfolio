import { Router } from 'express';
import axios from 'axios';

const router = Router();

// Spotify proxy
router.get('/spotify/now-playing', async (req, res) => {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;

  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
    return res.status(200).json({
      title: 'White Ferrari',
      artist: 'Frank Ocean',
      albumArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=150&h=150&q=80',
      url: 'https://open.spotify.com/track/2LMkwUjfZ4e6JTYYqyqu23',
      isPlaying: false
    });
  }

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

    if (nowPlayingRes.status === 204 || nowPlayingRes.status > 400 || !nowPlayingRes.data) {
      const recentRes = await axios.get('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      if (recentRes.data && recentRes.data.items && recentRes.data.items.length > 0) {
        const item = recentRes.data.items[0].track;
        return res.status(200).json({
          title: item.name,
          artist: item.artists.map((a: any) => a.name).join(', '),
          albumArt: item.album.images[0].url,
          url: item.external_urls.spotify,
          isPlaying: false
        });
      }
      throw new Error('Spotify player inactive');
    }

    const { item, is_playing } = nowPlayingRes.data;
    res.status(200).json({
      title: item.name,
      artist: item.artists.map((a: any) => a.name).join(', '),
      albumArt: item.album.images[0].url,
      url: item.external_urls.spotify,
      isPlaying: is_playing
    });
  } catch (error) {
    res.status(200).json({
      title: 'White Ferrari',
      artist: 'Frank Ocean',
      albumArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=150&h=150&q=80',
      url: 'https://open.spotify.com/track/2LMkwUjfZ4e6JTYYqyqu23',
      isPlaying: false
    });
  }
});

// GitHub Contributions proxy
router.get('/github/contributions', async (req, res) => {
  const { GITHUB_TOKEN, GITHUB_USERNAME } = process.env;
  if (!GITHUB_TOKEN) {
    return res.status(404).json({ message: 'GitHub token not configured' });
  }

  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
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
        variables: { username: GITHUB_USERNAME || 'geetikavasistha-01' }
      },
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const calendar = response.data?.data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar) {
      throw new Error('Invalid GitHub response');
    }

    res.status(200).json({
      totalContributions: calendar.totalContributions,
      weeks: calendar.weeks
    });
  } catch (error) {
    res.status(404).json({ message: 'GitHub proxy query failed' });
  }
});

export default router;
