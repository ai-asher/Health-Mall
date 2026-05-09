import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../theme/colors';

type Props = {
  icon?: React.ComponentProps<typeof Ionicons>['name'];
  title?: string;
  subtitle?: string;
};

export default function EmptyState({ icon = 'document-text-outline', title = '暂无数据', subtitle }: Props) {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={64} color="#D9DDE3" />
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 16, color: colors.textSecondary, marginTop: 16 },
  subtitle: { fontSize: 13, color: colors.textTertiary, marginTop: 8 },
});
