import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import PressableScale from './PressableScale';
import { colors } from '../theme/colors';

type Props = {
  size?: number;
  initialLiked?: boolean;
  initialCount?: number;
  vertical?: boolean;
};

export default function HeartButton({
  size = 32,
  initialLiked = false,
  initialCount = 0,
  vertical = true,
}: Props) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const scale = useSharedValue(1);

  const onPress = () => {
    setLiked((l) => !l);
    setCount((c) => c + (liked ? -1 : 1));
    scale.value = withSequence(
      withTiming(1.4, { duration: 120 }),
      withSpring(1, { damping: 8, stiffness: 200 }),
    );
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  };

  const aStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const Container = vertical ? View : View;

  return (
    <PressableScale onPress={onPress} scale={0.92}>
      <Container style={vertical ? styles.vertical : styles.horizontal}>
        <Animated.View style={aStyle}>
          <Ionicons
            name={liked ? 'heart' : 'heart-outline'}
            size={size}
            color={liked ? colors.like : colors.white}
          />
        </Animated.View>
        <Text style={[styles.count, !vertical && { marginLeft: 4 }]}>{count.toLocaleString()}</Text>
      </Container>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  vertical: { alignItems: 'center' },
  horizontal: { flexDirection: 'row', alignItems: 'center' },
  count: { color: colors.white, fontSize: 12, marginTop: 2 },
});
