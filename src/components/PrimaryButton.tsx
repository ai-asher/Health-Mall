import React from 'react';
import { StyleSheet, Text, ViewStyle, StyleProp } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

import PressableScale from './PressableScale';
import { colors } from '../theme/colors';
import { fontSize, weight } from '../theme/typography';

type Props = {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  haptic?: boolean;
  fullWidth?: boolean;
};

export default function PrimaryButton({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled,
  style,
  haptic = true,
  fullWidth = true,
}: Props) {
  const sizeStyle = sizeMap[size];

  const handle = () => {
    if (haptic) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    }
    onPress?.();
  };

  if (variant === 'primary') {
    return (
      <PressableScale onPress={handle} disabled={disabled} style={[fullWidth && { width: '100%' }, style]}>
        <LinearGradient
          colors={[colors.orangeStart, colors.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.base, sizeStyle, disabled && { opacity: 0.5 }]}
        >
          <Text style={[styles.text, sizeStyle.text]}>{title}</Text>
        </LinearGradient>
      </PressableScale>
    );
  }

  return (
    <PressableScale onPress={handle} disabled={disabled} style={[fullWidth && { width: '100%' }, style]}>
      <Text
        style={[
          styles.base,
          sizeStyle,
          variant === 'outline' && styles.outline,
          variant === 'ghost' && styles.ghost,
          disabled && { opacity: 0.5 },
          { color: colors.primary, textAlign: 'center' },
        ]}
      >
        {title}
      </Text>
    </PressableScale>
  );
}

const sizeMap = {
  sm: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 18, text: { fontSize: fontSize.sm } },
  md: { paddingVertical: 12, paddingHorizontal: 24, borderRadius: 24, text: { fontSize: fontSize.base } },
  lg: { paddingVertical: 16, paddingHorizontal: 32, borderRadius: 28, text: { fontSize: fontSize.lg } },
} as const;

const styles = StyleSheet.create({
  base: { alignItems: 'center', justifyContent: 'center' },
  text: { color: colors.white, fontWeight: weight.bold },
  outline: { borderWidth: 1.5, borderColor: colors.primary, backgroundColor: 'transparent' },
  ghost: { backgroundColor: 'transparent' },
});
