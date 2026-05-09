export const colors = {
  primary: '#FF6A1A',
  primaryLight: '#FF8A3D',
  primaryBg: '#FFEFE0',
  peachStart: '#FFE9D6',
  peachEnd: '#FFD3B0',
  orangeStart: '#FFB066',
  orangeEnd: '#FF6A1A',

  text: '#1A1A1A',
  textSecondary: '#666666',
  textTertiary: '#999999',
  textInverse: '#FFFFFF',

  bg: '#F5F6F8',
  card: '#FFFFFF',
  divider: '#EFEFEF',

  black: '#000000',
  white: '#FFFFFF',

  like: '#FF3B30',
  tagBg: '#FFF1E6',

  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  // 中医五行
  wood: '#4ADE80',
  fire: '#F87171',
  earth: '#FBBF24',
  metal: '#E5E7EB',
  water: '#60A5FA',

  // gradients (start, end)
  gradGreen: ['#1F6E3E', '#3FA663'] as const,
  gradOrange: ['#FFB066', '#FF6A1A'] as const,
  gradPurple: ['#7C3AED', '#A855F7'] as const,
  gradBlue: ['#1E3A8A', '#3B82F6'] as const,
  gradRed: ['#B83A2B', '#EF4444'] as const,
  gradPeach: ['#FFE9D6', '#FFD3B0'] as const,
} as const;

export type Colors = typeof colors;
