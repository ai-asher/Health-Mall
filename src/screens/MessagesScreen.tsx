import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated, { FadeInRight } from 'react-native-reanimated';

import { colors } from '../theme/colors';
import { fontSize, weight } from '../theme/typography';
import { messages } from '../mock/messages';
import PressableScale from '../components/PressableScale';
import type { RootStackParamList } from '../navigation/RootStack';

const TYPE_ICON: Record<string, string> = {
  doctor: 'medical',
  system: 'megaphone',
  logistics: 'cube',
  coupon: 'gift',
};

export default function MessagesScreen() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const totalUnread = messages.reduce((s, m) => s + m.unread, 0);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.profile}>
          <LinearGradient
            colors={colors.gradOrange}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.avatar}
          >
            <Ionicons name="person" size={28} color={colors.white} />
          </LinearGradient>
          <View>
            <View style={styles.nameRow}>
              <Text style={styles.name}>我的资料</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.text} />
            </View>
            <Text style={styles.userId}>4056899579 · 未读 {totalUnread}</Text>
          </View>
        </View>
        <View style={styles.headerActions}>
          <PressableScale style={styles.iconBtn}>
            <Ionicons name="search" size={22} color={colors.text} />
          </PressableScale>
          <PressableScale style={styles.iconBtn}>
            <Ionicons name="people" size={22} color={colors.text} />
          </PressableScale>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: 8, paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((m, i) => (
          <Animated.View key={m.id} entering={FadeInRight.delay(i * 60).duration(360)}>
            <PressableScale
              onPress={() => nav.navigate('Chat', { messageId: m.id })}
              style={styles.row}
            >
              <LinearGradient
                colors={m.avatar}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.msgAvatar}
              >
                <Ionicons name={TYPE_ICON[m.type] as any} size={22} color={colors.white} />
              </LinearGradient>
              {m.unread > 0 && (
                <View style={styles.unread}>
                  <Text style={styles.unreadText}>{m.unread}</Text>
                </View>
              )}
              <View style={{ flex: 1, marginLeft: 12 }}>
                <View style={styles.titleRow}>
                  <Text style={styles.msgTitle} numberOfLines={1}>{m.title}</Text>
                  <Text style={styles.msgTime}>{m.time}</Text>
                </View>
                <Text style={styles.msgPreview} numberOfLines={1}>{m.preview}</Text>
              </View>
            </PressableScale>
          </Animated.View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EEF0F4' },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EEF0F4',
  },
  profile: { flexDirection: 'row', alignItems: 'center' },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameRow: { flexDirection: 'row', alignItems: 'center' },
  name: { fontSize: 18, fontWeight: weight.bold, color: colors.text, marginRight: 4 },
  userId: { fontSize: 13, color: colors.textSecondary, marginTop: 2 },
  headerActions: { flexDirection: 'row' },
  iconBtn: { padding: 8, marginLeft: 4 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginHorizontal: 12,
    marginBottom: 8,
    borderRadius: 12,
  },
  msgAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unread: {
    position: 'absolute',
    top: 8,
    left: 50,
    backgroundColor: colors.error,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadText: { color: colors.white, fontSize: 11, fontWeight: weight.bold },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  msgTitle: { fontSize: 15, fontWeight: weight.semibold, color: colors.text, flex: 1 },
  msgTime: { fontSize: 12, color: colors.textTertiary, marginLeft: 6 },
  msgPreview: { fontSize: 13, color: colors.textSecondary, marginTop: 4 },
});
