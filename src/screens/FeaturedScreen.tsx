import React, { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
  ViewToken,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '../theme/colors';
import { fontSize, weight } from '../theme/typography';
import { videos, type Video } from '../mock/videos';
import HeartButton from '../components/HeartButton';
import PressableScale from '../components/PressableScale';

const { width: W, height: H } = Dimensions.get('window');
const ITEM_HEIGHT = H;

const MODES = ['娱乐模式', '纯享模式'];

export default function FeaturedScreen() {
  const [active, setActive] = useState(0);
  const [mode, setMode] = useState(0);

  const onViewable = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      setActive(viewableItems[0].index);
    }
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
        keyExtractor={(v) => v.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        renderItem={({ item, index }) => (
          <VideoItem video={item} active={index === active} />
        )}
        onViewableItemsChanged={onViewable.current}
        viewabilityConfig={{ itemVisiblePercentThreshold: 60 }}
      />

      <SafeAreaView edges={['top']} style={styles.headerWrap} pointerEvents="box-none">
        <View style={styles.modes}>
          {MODES.map((m, i) => (
            <PressableScale key={m} onPress={() => setMode(i)} style={styles.modeBtn}>
              <Text style={[styles.modeText, mode === i && styles.modeTextActive]}>{m}</Text>
              {mode === i && <View style={styles.modeIndicator} />}
            </PressableScale>
          ))}
        </View>
        <PressableScale style={styles.searchIcon}>
          <Ionicons name="search" size={22} color={colors.white} />
        </PressableScale>
      </SafeAreaView>
    </View>
  );
}

function VideoItem({ video, active }: { video: Video; active: boolean }) {
  const heartsRef = useRef<{ id: number; x: number; y: number }[]>([]);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  const spawnHeart = (x: number, y: number) => {
    const id = Date.now() + Math.random();
    heartsRef.current.push({ id, x, y });
    setHearts((h) => [...h, { id, x, y }]);
    setTimeout(() => {
      heartsRef.current = heartsRef.current.filter((h) => h.id !== id);
      setHearts((h) => h.filter((it) => it.id !== id));
    }, 1400);
  };

  const lastTap = useSharedValue(0);

  const tap = Gesture.Tap()
    .maxDuration(250)
    .onEnd((e) => {
      const now = Date.now();
      if (now - lastTap.value < 300) {
        runOnJS(spawnHeart)(e.x, e.y);
        runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Medium);
      }
      lastTap.value = now;
    });

  return (
    <View style={{ width: W, height: ITEM_HEIGHT }}>
      <LinearGradient
        colors={video.bgGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <GestureDetector gesture={tap}>
        <View style={styles.videoArea}>
          <View style={styles.posterCenter}>
            <Text style={styles.posterText}>{video.posterText}</Text>
            <Text style={styles.posterSub}>{video.posterSubtext}</Text>
          </View>

          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.4)']}
            style={styles.bottomFade}
            pointerEvents="none"
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0)']}
            style={styles.topFade}
            pointerEvents="none"
          />

          {hearts.map((h) => (
            <FloatingHeart key={h.id} x={h.x} y={h.y} />
          ))}
        </View>
      </GestureDetector>

      <View style={styles.sideActions}>
        <View style={styles.authorCircle}>
          <LinearGradient
            colors={video.authorAvatar}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFillObject}
          />
          <Ionicons name="person" size={20} color={colors.white} />
        </View>
        <HeartButton initialCount={video.likes} />
        <ActionItem icon="chatbubble-ellipses" label={String(video.comments)} />
        <ActionItem icon="star-outline" label={video.collects.toLocaleString()} />
        <ActionItem icon="logo-wechat" label={video.shares.toLocaleString()} color="#06C160" />
        <PressableScale style={styles.publishBtn}>
          <Ionicons name="add" size={26} color={colors.text} />
        </PressableScale>
        <Text style={styles.publishLabel}>发布</Text>
      </View>

      <View style={styles.subtitleArea}>
        <Text style={styles.author}>@{video.author} · {video.authorTitle}</Text>
        <Text style={styles.title}>{video.title}</Text>
        <Text style={styles.subtitle}>{video.subtitle}</Text>
      </View>
    </View>
  );
}

function ActionItem({ icon, label, color }: { icon: any; label: string; color?: string }) {
  return (
    <PressableScale style={styles.actionItem}>
      <Ionicons name={icon} size={32} color={color ?? colors.white} />
      <Text style={styles.actionLabel}>{label}</Text>
    </PressableScale>
  );
}

function FloatingHeart({ x, y }: { x: number; y: number }) {
  const op = useSharedValue(1);
  const scale = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotate = useSharedValue((Math.random() - 0.5) * 60);

  React.useEffect(() => {
    scale.value = withSequence(
      withTiming(1.6, { duration: 220, easing: Easing.out(Easing.back(2)) }),
      withTiming(1, { duration: 120 }),
    );
    translateY.value = withTiming(-160, { duration: 1300, easing: Easing.out(Easing.cubic) });
    op.value = withDelay(900, withTiming(0, { duration: 400 }));
  }, []);

  const style = useAnimatedStyle(() => ({
    opacity: op.value,
    transform: [
      { translateX: x - 40 },
      { translateY: y - 40 + translateY.value },
      { scale: scale.value },
      { rotate: `${rotate.value}deg` },
    ],
  }));

  return (
    <Animated.View pointerEvents="none" style={[styles.floatingHeart, style]}>
      <Ionicons name="heart" size={80} color={colors.like} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.black },
  headerWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  modes: { flex: 1, flexDirection: 'row', justifyContent: 'center' },
  modeBtn: { marginHorizontal: 18, alignItems: 'center', paddingVertical: 6 },
  modeText: { color: 'rgba(255,255,255,0.6)', fontSize: 16 },
  modeTextActive: { color: colors.white, fontWeight: weight.bold, fontSize: 17 },
  modeIndicator: {
    marginTop: 4,
    width: 18,
    height: 2,
    backgroundColor: colors.white,
    borderRadius: 1,
  },
  searchIcon: { position: 'absolute', right: 16, bottom: 8 },
  videoArea: { flex: 1 },
  posterCenter: {
    position: 'absolute',
    top: '32%',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  posterText: { color: colors.white, fontSize: 64, fontWeight: weight.black, letterSpacing: 8 },
  posterSub: { color: 'rgba(255,255,255,0.85)', fontSize: 18, marginTop: 8, letterSpacing: 4 },
  bottomFade: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 200 },
  topFade: { position: 'absolute', top: 0, left: 0, right: 0, height: 100 },
  sideActions: {
    position: 'absolute',
    right: 12,
    bottom: 140,
    alignItems: 'center',
  },
  authorCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  actionItem: { alignItems: 'center', marginBottom: 18 },
  actionLabel: { color: colors.white, fontSize: 12, marginTop: 2 },
  publishBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  publishLabel: { color: colors.white, fontSize: 12, marginTop: 4 },
  subtitleArea: { position: 'absolute', left: 16, bottom: 110, right: 80 },
  author: { color: 'rgba(255,255,255,0.9)', fontSize: 13, marginBottom: 4 },
  title: { color: colors.white, fontSize: 18, fontWeight: weight.bold, marginBottom: 2 },
  subtitle: { color: 'rgba(255,255,255,0.85)', fontSize: 13, lineHeight: 18 },
  floatingHeart: { position: 'absolute', width: 80, height: 80 },
});
