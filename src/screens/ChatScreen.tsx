import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { colors } from '../theme/colors';
import { fontSize, weight } from '../theme/typography';
import { messages } from '../mock/messages';
import PressableScale from '../components/PressableScale';
import type { RootStackParamList } from '../navigation/RootStack';

export default function ChatScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'Chat'>>();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const msg = messages.find((m) => m.id === route.params.messageId);
  const [input, setInput] = useState('');
  const [convo, setConvo] = useState(msg?.conversation ?? []);

  if (!msg) return null;

  const send = () => {
    if (!input.trim()) return;
    setConvo([...convo, { from: 'me', text: input, time: '现在' }]);
    setInput('');
    setTimeout(() => {
      setConvo((c) => [
        ...c,
        { from: 'them', text: '收到您的信息，请稍等', time: '现在' },
      ]);
    }, 700);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <SafeAreaView edges={['top']} style={styles.headerWrap}>
        <PressableScale style={{ padding: 8 }} onPress={() => nav.goBack()}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </PressableScale>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.headerTitle}>{msg.title}</Text>
          {msg.type === 'doctor' && <Text style={styles.headerSub}>在线 · 通常 5 分钟内回复</Text>}
        </View>
        <PressableScale style={{ padding: 8 }}>
          <Ionicons name="ellipsis-horizontal" size={22} color={colors.text} />
        </PressableScale>
      </SafeAreaView>

      <ScrollView
        style={{ flex: 1, backgroundColor: '#F5F6F8' }}
        contentContainerStyle={{ padding: 12 }}
        showsVerticalScrollIndicator={false}
      >
        {convo.length === 0 && (
          <View style={styles.notice}>
            <Text style={styles.noticeText}>{msg.preview}</Text>
          </View>
        )}
        {convo.map((c, i) => {
          const me = c.from === 'me';
          return (
            <Animated.View
              key={i}
              entering={FadeInDown.duration(280)}
              style={[styles.bubbleRow, me && { justifyContent: 'flex-end' }]}
            >
              {!me && (
                <LinearGradient
                  colors={msg.avatar}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.bubbleAvatar}
                >
                  <Ionicons name="person" size={16} color={colors.white} />
                </LinearGradient>
              )}
              <View style={[styles.bubble, me ? styles.bubbleMe : styles.bubbleThem]}>
                <Text style={[styles.bubbleText, me && { color: colors.white }]}>{c.text}</Text>
                <Text style={[styles.bubbleTime, me && { color: 'rgba(255,255,255,0.7)' }]}>
                  {c.time}
                </Text>
              </View>
              {me && (
                <View style={[styles.bubbleAvatar, { backgroundColor: '#E5E7EC' }]}>
                  <Ionicons name="person" size={16} color={colors.textSecondary} />
                </View>
              )}
            </Animated.View>
          );
        })}
      </ScrollView>

      <View style={styles.inputBar}>
        <PressableScale style={styles.inputIcon}>
          <Ionicons name="add-circle-outline" size={26} color={colors.textSecondary} />
        </PressableScale>
        <TextInput
          value={input}
          onChangeText={setInput}
          style={styles.input}
          placeholder="说点什么..."
          placeholderTextColor={colors.textTertiary}
          multiline
        />
        <PressableScale onPress={send} style={styles.sendBtn} disabled={!input.trim()}>
          <Text style={[styles.sendText, !input.trim() && { opacity: 0.4 }]}>发送</Text>
        </PressableScale>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  headerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
  },
  headerTitle: { fontSize: 16, fontWeight: weight.bold, color: colors.text },
  headerSub: { fontSize: 11, color: colors.success, marginTop: 2 },
  notice: {
    backgroundColor: 'rgba(0,0,0,0.04)',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignSelf: 'center',
    marginVertical: 8,
  },
  noticeText: { fontSize: 12, color: colors.textTertiary },
  bubbleRow: { flexDirection: 'row', marginVertical: 6 },
  bubbleAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubble: {
    maxWidth: '70%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
    marginHorizontal: 8,
  },
  bubbleMe: { backgroundColor: colors.primary },
  bubbleThem: { backgroundColor: colors.white },
  bubbleText: { fontSize: 14, color: colors.text, lineHeight: 20 },
  bubbleTime: { fontSize: 10, color: colors.textTertiary, marginTop: 4, alignSelf: 'flex-end' },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 8,
    paddingVertical: 6,
    paddingBottom: 24,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.divider,
    backgroundColor: colors.white,
  },
  inputIcon: { padding: 6 },
  input: {
    flex: 1,
    backgroundColor: '#F5F6F8',
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    minHeight: 36,
    maxHeight: 100,
  },
  sendBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: colors.primary,
    borderRadius: 16,
    marginLeft: 8,
  },
  sendText: { color: colors.white, fontSize: 13, fontWeight: weight.bold },
});
