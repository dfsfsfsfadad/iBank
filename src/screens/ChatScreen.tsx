import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenShell } from '../components/layout';
import { TopBar } from '../components/ui';
import { CHAT_INITIAL, type ChatItem } from '../data/messages';
import { useNavigation } from '../navigation/NavigationContext';
import { colors, radius } from '../theme';

// 6 таңбалы кодты күлгін түспен бөлектейді
function BankText({ text }: { text: string }) {
  return (
    <Text style={styles.msg}>
      {text.split(/(\b\d{6}\b)/).map((part, i) =>
        i % 2 === 1 ? <Text key={i} style={styles.code}>{part}</Text> : part)}
    </Text>
  );
}

// Bank of America — чат
export function ChatScreen() {
  const { navigate } = useNavigation();
  const [items, setItems] = useState<ChatItem[]>(CHAT_INITIAL);
  const [text, setText] = useState('');
  const scrollRef = useRef<React.ComponentRef<typeof ScrollView>>(null);
  const canSend = text.trim().length > 0;

  useEffect(() => {
    const t = setTimeout(() => scrollRef.current?.scrollToEnd({ animated: false }), 100);
    return () => clearTimeout(t);
  }, []);

  const send = () => {
    if (!canSend) return;
    setItems(prev => [...prev, { id: String(Date.now()), kind: 'msg', from: 'me', text: text.trim() }]);
    setText('');
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 50);
  };

  const inputBar = (
    <View style={styles.inputBar}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Type something..."
        placeholderTextColor={colors.textMute}
        returnKeyType="send"
        onSubmitEditing={send}
      />
      <TouchableOpacity style={[styles.send, !canSend && styles.sendOff]} onPress={send} disabled={!canSend} activeOpacity={0.85}>
        <Ionicons name="arrow-forward" size={18} color={canSend ? colors.white : '#C9CBDD'} />
      </TouchableOpacity>
    </View>
  );

  return (
    <ScreenShell scrollRef={scrollRef} keyboard={inputBar}>
      <TopBar title="Bank of America" variant="white" onBack={() => navigate('message')} />
      <View style={styles.chat}>
        {items.map(it =>
          it.kind === 'date' ? (
            <Text key={it.id} style={styles.date}>{it.text}</Text>
          ) : it.from === 'me' ? (
            <View key={it.id} style={[styles.bubble, styles.bubbleMe]}>
              <Text style={[styles.msg, { color: colors.white }]}>{it.text}</Text>
            </View>
          ) : (
            <View key={it.id} style={[styles.bubble, styles.bubbleBank]}>
              <BankText text={it.text} />
            </View>
          ))}
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  chat: { paddingHorizontal: 24, paddingTop: 8, gap: 12 },
  date: { color: colors.textSub, fontSize: 10, textAlign: 'center', marginVertical: 4 },
  bubble: { maxWidth: '78%', borderRadius: 14, paddingVertical: 10, paddingHorizontal: 14 },
  bubbleBank: { alignSelf: 'flex-start', backgroundColor: '#F1F0FA' },
  bubbleMe: { alignSelf: 'flex-end', backgroundColor: colors.primary },
  msg: { color: colors.text, fontSize: 12, lineHeight: 18 },
  code: { color: colors.primary, fontWeight: '700' },
  inputBar: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 24, paddingTop: 10, paddingBottom: 18, backgroundColor: colors.bg },
  input: { flex: 1, height: 44, borderRadius: radius.field, backgroundColor: colors.fieldBg, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 14, fontSize: 13, color: colors.text },
  send: { width: 40, height: 40, borderRadius: 999, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  sendOff: { backgroundColor: '#EDEEF6' },
});
