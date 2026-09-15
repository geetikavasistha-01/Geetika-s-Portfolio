import { create } from 'zustand';

export type ThemeName = 'linen' | 'mist' | 'midnight' | 'harbor';

export interface ThemeDefinition {
  id: ThemeName;
  name: string;
  type: 'light' | 'dark';
  bg: string;
  surface: string;
  text: string;
  textMuted: string;
  accent: string;
  border: string;
}

export const THEMES: Record<ThemeName, ThemeDefinition> = {
  linen: {
    id: 'linen',
    name: 'LINEN',
    type: 'light',
    bg: '#FAF6EE',
    surface: '#F3EDE0',
    text: '#1E1B16',
    textMuted: '#6B6558',
    accent: '#B5602F',
    border: '#E3DACB',
  },
  mist: {
    id: 'mist',
    name: 'MIST',
    type: 'light',
    bg: '#F7F6FA',
    surface: '#EEECF4',
    text: '#1C1B22',
    textMuted: '#67667A',
    accent: '#8C8FC9',
    border: '#DEDCE9',
  },
  midnight: {
    id: 'midnight',
    name: 'MIDNIGHT',
    type: 'dark',
    bg: '#0D0D10',
    surface: '#17171B',
    text: '#EDEDEF',
    textMuted: '#9A9AA2',
    accent: '#E3A8AE',
    border: '#26262C',
  },
  harbor: {
    id: 'harbor',
    name: 'HARBOR',
    type: 'dark',
    bg: '#10121C',
    surface: '#191C2A',
    text: '#ECECEF',
    textMuted: '#9294A6',
    accent: '#E0B65C',
    border: '#262A3C',
  },
};

function applyThemeToDOM(themeName: ThemeName) {
  const root = document.documentElement;
  root.setAttribute('data-theme', themeName);
  const themeType = THEMES[themeName]?.type || 'light';
  if (themeType === 'dark') {
    root.classList.add('dark');
    root.classList.remove('light');
  } else {
    root.classList.add('light');
    root.classList.remove('dark');
  }
}

interface UIState {
  recruiterMode: boolean;
  cliOpen: boolean;
  cmdPaletteOpen: boolean;
  clockDialogOpen: boolean;
  currentTheme: ThemeName;
  theme: 'dark' | 'light';
  followSystem: boolean;
  toggleRecruiterMode: () => void;
  setCliOpen: (open: boolean) => void;
  setCmdPaletteOpen: (open: boolean) => void;
  setClockDialogOpen: (open: boolean) => void;
  setTheme: (theme: ThemeName) => void;
  setFollowSystem: (enabled: boolean) => void;
  toggleTheme: () => void;
  initTheme: () => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  recruiterMode: (() => {
    try {
      return localStorage.getItem('recruiterMode') === 'true';
    } catch {
      return false;
    }
  })(),
  cliOpen: false,
  cmdPaletteOpen: false,
  clockDialogOpen: false,
  setClockDialogOpen: (open) => set({ clockDialogOpen: open }),

  currentTheme: 'linen',
  theme: 'light',
  followSystem: false,

  toggleRecruiterMode: () => set((state) => {
    const next = !state.recruiterMode;
    try {
      localStorage.setItem('recruiterMode', String(next));
    } catch (e) {
      console.warn('LocalStorage recruiterMode set error:', e);
    }
    return { recruiterMode: next };
  }),

  setCliOpen: (open) => set({ cliOpen: open }),
  setCmdPaletteOpen: (open) => set({ cmdPaletteOpen: open }),

  setTheme: (themeName: ThemeName) => {
    try {
      localStorage.setItem('theme', themeName);
      localStorage.setItem('theme-follow-system', 'false');
    } catch (e) {
      console.warn('LocalStorage theme set error:', e);
    }
    applyThemeToDOM(themeName);
    set({
      currentTheme: themeName,
      followSystem: false,
      theme: THEMES[themeName].type,
    });
  },

  setFollowSystem: (enabled: boolean) => {
    try {
      localStorage.setItem('theme-follow-system', String(enabled));
    } catch (e) {
      console.warn('LocalStorage followSystem set error:', e);
    }

    if (enabled) {
      const isDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
      const themeName: ThemeName = isDark ? 'midnight' : 'linen';
      applyThemeToDOM(themeName);
      set({
        followSystem: true,
        currentTheme: themeName,
        theme: isDark ? 'dark' : 'light',
      });
    } else {
      set({ followSystem: false });
    }
  },

  toggleTheme: () => {
    const { currentTheme } = get();
    // Toggle between primary light (linen) and primary dark (midnight)
    const isCurrentlyDark = THEMES[currentTheme].type === 'dark';
    const next: ThemeName = isCurrentlyDark ? 'linen' : 'midnight';
    get().setTheme(next);
  },

  initTheme: () => {
    try {
      const followSystemStored = localStorage.getItem('theme-follow-system') === 'true';
      const storedTheme = localStorage.getItem('theme') as ThemeName | null;
      const mediaQuery = typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)') : null;

      let activeTheme: ThemeName = 'linen';

      if (followSystemStored && mediaQuery) {
        activeTheme = mediaQuery.matches ? 'midnight' : 'linen';
      } else if (storedTheme && THEMES[storedTheme]) {
        activeTheme = storedTheme;
      } else if (mediaQuery && mediaQuery.matches) {
        activeTheme = 'midnight';
      } else {
        activeTheme = 'linen';
      }

      applyThemeToDOM(activeTheme);

      // Listen for live system changes if followSystem is active
      if (mediaQuery) {
        const handleSystemChange = (e: MediaQueryListEvent) => {
          if (get().followSystem) {
            const nextTheme: ThemeName = e.matches ? 'midnight' : 'linen';
            applyThemeToDOM(nextTheme);
            set({
              currentTheme: nextTheme,
              theme: e.matches ? 'dark' : 'light',
            });
          }
        };

        mediaQuery.addEventListener('change', handleSystemChange);
      }

      set({
        currentTheme: activeTheme,
        followSystem: followSystemStored,
        theme: THEMES[activeTheme].type,
      });
    } catch {
      applyThemeToDOM('linen');
      set({ currentTheme: 'linen', followSystem: false, theme: 'light' });
    }
  },
}));
