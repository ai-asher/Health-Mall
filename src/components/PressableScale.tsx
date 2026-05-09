import React from 'react';
import { Pressable, PressableProps, ViewStyle, StyleProp } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

type Props = Omit<PressableProps, 'children' | 'style'> & {
  scale?: number;
  style?: StyleProp<ViewStyle>;
  haptic?: boolean;
  children?: React.ReactNode;
};

export default function PressableScale({
  scale = 0.96,
  style,
  children,
  onPressIn,
  onPressOut,
  ...rest
}: Props) {
  const s = useSharedValue(1);
  const aStyle = useAnimatedStyle(() => ({ transform: [{ scale: s.value }] }));

  return (
    <Pressable
      onPressIn={(e) => {
        s.value = withTiming(scale, { duration: 80 });
        onPressIn?.(e);
      }}
      onPressOut={(e) => {
        s.value = withSpring(1, { damping: 15, stiffness: 220 });
        onPressOut?.(e);
      }}
      {...rest}
    >
      <Animated.View style={[aStyle, style]}>{children}</Animated.View>
    </Pressable>
  );
}
