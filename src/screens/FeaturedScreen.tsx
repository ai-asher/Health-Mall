import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../theme/colors';

const MODES = ['娱乐模式', '纯享模式'];

export default function FeaturedScreen() {
  const [mode, setMode] = useState(0);

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.headerWrap}>
        <View style={styles.modes}>
          {MODES.map((m, i) => (
            <TouchableOpacity key={m} onPress={() => setMode(i)} style={styles.modeBtn}>
              <Text style={[styles.modeText, mode === i && styles.modeTextActive]}>{m}</Text>
              {mode === i && <View style={styles.modeIndicator} />}
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.searchIcon}>
          <Ionicons name="search" size={22} color={colors.white} />
        </TouchableOpacity>
      </SafeAreaView>

      <View style={styles.videoArea}>
        <View style={styles.videoPlaceholder}>
          <Ionicons name="play-circle-outline" size={80} color="rgba(255,255,255,0.3)" />
          <Text style={styles.videoHint}>视频内容占位</Text>
        </View>

        <View style={styles.sideActions}>
          <View style={styles.authorAvatar}>
            <Ionicons name="person" size={18} color={colors.white} />
          </View>
          <ActionItem icon="heart" label="19464" />
          <ActionItem icon="chatbubble-ellipses" label="2" />
          <ActionItem icon="star" label="7003" />
          <ActionItem icon="logo-wechat" label="4936" color="#06C160" />
          <TouchableOpacity style={styles.publishBtn}>
            <Ionicons name="add" size={26} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.publishLabel}>发布</Text>
        </View>

        <View style={styles.subtitleArea}>
          <Text style={styles.subtitle}>失眠的人看过来！</Text>
        </View>
      </View>
    </View>
  );
}

function ActionItem({ icon, label, color }: { icon: any; label: string; color?: string }) {
  return (
    <TouchableOpacity style={styles.actionItem}>
      <Ionicons name={icon} size={32} color={color ?? colors.white} />
      <Text style={styles.actionLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.black },
  headerWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  modes: { flex: 1, flexDirection: 'row', justifyContent: 'center' },
  modeBtn: { marginHorizontal: 18, alignItems: 'center', paddingVertical: 6 },
  modeText: { color: 'rgba(255,255,255,0.6)', fontSize: 16 },
  modeTextActive: { color: colors.white, fontWeight: '700', fontSize: 17 },
  modeIndicator: {
    marginTop: 4,
    width: 18,
    height: 2,
    backgroundColor: colors.white,
    borderRadius: 1,
  },
  searchIcon: { position: 'absolute', right: 16, bottom: 8 },
  videoArea: { flex: 1, position: 'relative' },
  videoPlaceholder: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoHint: { color: 'rgba(255,255,255,0.4)', marginTop: 12, fontSize: 14 },
  sideActions: {
    position: 'absolute',
    right: 12,
    bottom: 90,
    alignItems: 'center',
  },
  authorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#A4C97A',
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
  subtitleArea: { position: 'absolute', left: 16, bottom: 40 },
  subtitle: { color: colors.white, fontSize: 16, fontWeight: '600' },
});
