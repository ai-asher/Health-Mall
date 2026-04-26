import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../theme/colors';

export default function MessagesScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.profile}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={28} color={colors.textSecondary} />
          </View>
          <View>
            <View style={styles.nameRow}>
              <Text style={styles.name}>我的资料</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.text} />
            </View>
            <Text style={styles.userId}>4056899579</Text>
          </View>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="search" size={22} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="people" size={22} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.empty}>
        <View style={styles.emptyIcon}>
          <Ionicons name="document-text-outline" size={64} color="#D9DDE3" />
        </View>
        <Text style={styles.emptyText}>暂无消息</Text>
      </View>
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
  },
  profile: { flexDirection: 'row', alignItems: 'center' },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E5E7EC',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameRow: { flexDirection: 'row', alignItems: 'center' },
  name: { fontSize: 18, fontWeight: '700', color: colors.text, marginRight: 4 },
  userId: { fontSize: 14, color: colors.text, marginTop: 2 },
  headerActions: { flexDirection: 'row' },
  iconBtn: { padding: 8, marginLeft: 4 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: -80 },
  emptyIcon: { marginBottom: 16, opacity: 0.7 },
  emptyText: { fontSize: 16, color: colors.textSecondary },
});
