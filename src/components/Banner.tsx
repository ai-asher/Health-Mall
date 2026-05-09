import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { colors } from '../theme/colors';
import { fontSize, weight } from '../theme/typography';

export type BannerSlide = {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  gradient: readonly [string, string];
  posterText: string;
  posterSubtext?: string;
};

type Props = {
  slides: BannerSlide[];
  height?: number;
  autoplayMs?: number;
};

const { width: screenW } = Dimensions.get('window');
const BANNER_W = screenW - 32;

export default function Banner({ slides, height = 170, autoplayMs = 3500 }: Props) {
  const ref = useRef<FlatList<BannerSlide>>(null);
  const [idx, setIdx] = useState(0);
  const indexRef = useRef(0);

  useEffect(() => {
    const t = setInterval(() => {
      const next = (indexRef.current + 1) % slides.length;
      ref.current?.scrollToIndex({ index: next, animated: true });
    }, autoplayMs);
    return () => clearInterval(t);
  }, [autoplayMs, slides.length]);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const i = Math.round(e.nativeEvent.contentOffset.x / BANNER_W);
    if (i !== indexRef.current) {
      indexRef.current = i;
      setIdx(i);
    }
  };

  return (
    <View>
      <FlatList
        ref={ref}
        data={slides}
        keyExtractor={(it) => it.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        getItemLayout={(_, i) => ({ length: BANNER_W, offset: BANNER_W * i, index: i })}
        renderItem={({ item }) => <Slide slide={item} height={height} />}
      />
      <View style={styles.dots}>
        {slides.map((_, i) => (
          <Dot key={i} active={i === idx} />
        ))}
      </View>
    </View>
  );
}

function Slide({ slide, height }: { slide: BannerSlide; height: number }) {
  return (
    <View style={{ width: BANNER_W, marginHorizontal: 16 }}>
      <LinearGradient
        colors={slide.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.banner, { height }]}
      >
        <View style={styles.left}>
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.subtitle}>{slide.subtitle}</Text>
          <View style={styles.cta}>
            <Text style={styles.ctaText}>{slide.cta} {'>>>'}</Text>
          </View>
        </View>
        <View style={styles.poster}>
          <Text style={styles.posterText}>{slide.posterText}</Text>
          {slide.posterSubtext && <Text style={styles.posterSub}>{slide.posterSubtext}</Text>}
        </View>
      </LinearGradient>
    </View>
  );
}

function Dot({ active }: { active: boolean }) {
  const w = useSharedValue(active ? 16 : 6);
  useEffect(() => {
    w.value = withTiming(active ? 16 : 6, { duration: 220 });
  }, [active, w]);
  const style = useAnimatedStyle(() => ({
    width: w.value,
    backgroundColor: active ? colors.white : 'rgba(255,255,255,0.6)',
  }));
  return <Animated.View style={[styles.dot, style]} />;
}

const styles = StyleSheet.create({
  banner: {
    borderRadius: 12,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  left: { flex: 1 },
  title: { fontSize: fontSize.xxl, fontWeight: weight.black, color: colors.white, marginBottom: 6 },
  subtitle: { fontSize: 13, color: colors.white, lineHeight: 18 },
  cta: {
    marginTop: 10,
    backgroundColor: '#FFB066',
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
  },
  ctaText: { color: colors.white, fontWeight: weight.bold },
  poster: {
    width: 110,
    height: 110,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  posterText: { color: '#F5C84B', fontWeight: weight.black, fontSize: fontSize.lg },
  posterSub: { color: 'rgba(255,255,255,0.9)', fontSize: 11, marginTop: 4 },
  dots: { flexDirection: 'row', justifyContent: 'center', marginTop: 8 },
  dot: { height: 6, borderRadius: 3, marginHorizontal: 3 },
});
