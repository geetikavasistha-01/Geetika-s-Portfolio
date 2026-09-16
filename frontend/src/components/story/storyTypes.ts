export interface SceneDefinition {
  id: string;
  name: string;
  chapter: string;
  startProgress: number; // 0.0 to 1.0
  endProgress: number;   // 0.0 to 1.0
}

/**
 * Breakpoint mapping for all 7 scroll-story scenes.
 */
export const STORY_SCENES: SceneDefinition[] = [
  {
    id: 'scene-1-opening-field',
    name: 'The Opening Field',
    chapter: 'Prologue · Origin',
    startProgress: 0.0,
    endProgress: 0.14,
  },
  {
    id: 'scene-2-curiosity',
    name: 'Curiosity & Craft',
    chapter: 'Chapter I · What I Build',
    startProgress: 0.14,
    endProgress: 0.28,
  },
  {
    id: 'scene-3-workshop',
    name: 'The Workshop',
    chapter: 'Chapter II · Featured Projects',
    startProgress: 0.28,
    endProgress: 0.42,
  },
  {
    id: 'scene-4-growing-world',
    name: 'The Growing World',
    chapter: 'Chapter III · Experience & Roles',
    startProgress: 0.42,
    endProgress: 0.56,
  },
  {
    id: 'scene-5-connected-systems',
    name: 'Connected Systems',
    chapter: 'Chapter IV · Systems Thinking',
    startProgress: 0.56,
    endProgress: 0.70,
  },
  {
    id: 'scene-6-golden-hour',
    name: 'Golden Hour & Values',
    chapter: 'Chapter V · Principles',
    startProgress: 0.70,
    endProgress: 0.88,
  },
  {
    id: 'scene-7-night',
    name: 'The Night Sky & Finale',
    chapter: 'Epilogue · Contact & Horizon',
    startProgress: 0.88,
    endProgress: 1.0,
  },
];
