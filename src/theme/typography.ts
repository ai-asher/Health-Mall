import type { TextStyle } from 'react-native';

export const fontSize = {
  xs: 11,
  sm: 12,
  base: 14,
  md: 15,
  lg: 17,
  xl: 20,
  xxl: 24,
  display: 30,
  hero: 40,
} as const;

export const weight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  black: '900',
} as const satisfies Record<string, TextStyle['fontWeight']>;
