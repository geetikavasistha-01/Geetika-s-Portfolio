export interface PlaylistItem {
  id: string;
  title: string;
}

export interface WatchItem {
  title: string;
  posterUrl: string;
  type: 'movie' | 'series' | 'anime';
  genre: string;
  rating: number;
}

export interface PostEmbedItem {
  id: string;
  avatar: string;
  name: string;
  handle: string;
  isVerified: boolean;
  content: string;
  timestamp: string;
  likes: number;
  replies: number;
}

export interface BookItem {
  title: string;
  author: string;
  coverUrl: string;
}

export interface PaperItem {
  title: string;
  author: string;
  date: string;
  url: string;
}

export interface JournalEntry {
  title: string;
  date: string;
  body: string;
}

export interface LatelyStatus {
  listening: string;
  writing: string;
  looking: string;
}

// 1. Lately Section Status
export const latelyStatus: LatelyStatus = {
  listening: "ambient forest recordings & post-rock",
  writing: "drafting a new post on neural nets & memory structures",
  looking: "at early morning rain patterns over NCR"
};

// 2. Spotify Playlists Data (REAL DATA)
export const playlists: PlaylistItem[] = [
  { id: '57ZHFNhtu03031cZs9pMBG', title: '17 years old.' },
  { id: '5MTXrKf2s6p777EobCRyAG', title: 'Late Night Walks' },
  { id: '49swypht8BgBPLE56hntYG', title: 'Coding Sessions' },
  { id: '4no8COJRc8dFP9pwnJY5BC', title: 'Lofi Focus' }
];

// 3. Watch List (PLACEHOLDERS — Replace with your real items)
export const watchItems: WatchItem[] = [
  {
    title: 'Non Non Biyori',
    posterUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=400&h=600&q=80',
    type: 'anime',
    genre: 'Slice of Life',
    rating: 9.5
  },
  {
    title: 'Ted Lasso',
    posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=400&h=600&q=80',
    type: 'series',
    genre: 'Comedy / Drama',
    rating: 9.0
  },
  {
    title: 'Interstellar',
    posterUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&h=600&q=80',
    type: 'movie',
    genre: 'Sci-Fi / Adventure',
    rating: 9.8
  }
];

// 4. Words Scattered / Micro-posts (PLACEHOLDERS — Replace with your real posts)
export const posts: PostEmbedItem[] = [
  {
    id: 'post-1',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
    name: 'Geetika Vasistha',
    handle: 'geekykunoichi',
    isVerified: true,
    content: "sometimes the best code is the code you delete.\nthe architecture feels lighter.\nthe breathing room returns.",
    timestamp: '10:42 PM · Jul 24, 2026',
    likes: 42,
    replies: 3
  },
  {
    id: 'post-2',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
    name: 'Geetika Vasistha',
    handle: 'geekykunoichi',
    isVerified: true,
    content: "watching the rain compile itself in real time.\nno syntax errors, just pure flow.",
    timestamp: '8:15 AM · Jul 21, 2026',
    likes: 88,
    replies: 5
  }
];

// 5. Books Shelf (PLACEHOLDERS — Replace with your real items)
export const featuredBooks: BookItem[] = [
  {
    title: 'Database Internals',
    author: 'Alex Petrov',
    coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=150&h=200&q=80'
  },
  {
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    coverUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=150&h=200&q=80'
  }
];

// 6. Papers Shelf (REAL DATA)
export const returningPapers: PaperItem[] = [
  {
    title: 'The Google File System',
    author: 'Sanjay Ghemawat and Howard Gobioff',
    date: '2003',
    url: 'https://research.google.com/archive/gfs-sosp2003.pdf'
  },
  {
    title: 'In Search of an Understandable Consensus Algorithm (Raft)',
    author: 'Diego Ongaro and John Ousterhout',
    date: '2014',
    url: 'https://raft.github.io/raft.pdf'
  },
  {
    title: 'Bigtable: A Distributed Storage System for Structured Data',
    author: 'Fay Chang, Jeffrey Dean, et al.',
    date: '2006',
    url: 'https://research.google.com/archive/bigtable-osdi06.pdf'
  }
];

// 7. Journal Entries (PLACEHOLDERS — Replace with your real items)
export const journalEntries: JournalEntry[] = [
  {
    title: 'Finding quiet in Delhi NCR',
    date: 'July 24, 2026',
    body: 'Delhi NCR is usually loud, fast-paced, and full of static. Finding a quiet pocket of space to write, think, and look at the sky is rare. Early mornings or late nights are the only hours that belong purely to me.'
  },
  {
    title: 'On building systems that last',
    date: 'June 18, 2026',
    body: 'Most modern web apps feel temporary. We build features in minutes, ship them, and deprecate them in months. But there is a distinct pleasure in building quiet, local-first tools that do one thing cleanly and survive without a server update.'
  }
];

// 8. Sensory Mood Fragments (PLACEHOLDERS — Replace with your real items)
export const smallTruths: string[] = [
  "the smell of black coffee at 5:00 AM.",
  "rain sounds compiling against the window panes.",
  "the visual symmetry of a clean terminal block.",
  "leaves shifting under the wind outside the desk."
];
