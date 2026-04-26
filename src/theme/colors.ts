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
} as const;

export type Colors = typeof colors;
