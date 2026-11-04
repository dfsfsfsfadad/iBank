import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenShell, BottomNav } from '../components/layout';
import { TopBar } from '../components/ui';
import { MESSAGES } from '../data/messages';
import { useNavigation } from '../navigation/NavigationContext';
import { useTabNavigate } from '../navigation/useTabNavigate';
import { colors } from '../theme';

export function MessageScreen() {
  const { navigate } = useNavigation();
  const go = useTabNavigate();

  return (
    <ScreenShell keyboard={<BottomNav active="mail" onChange={go} />}>
      <TopBar title="Message" variant="white" onBack={() => navigate('home')} />
      <View style={styles.list}>
        {MESSAGES.map(m => (
          <TouchableOpacity
            key={m.id}
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => { if (m.id === 'boa') navigate('chat'); }}
          >
            <View style={[styles.icon, { backgroundColor: m.color }]}>
              <Ionicons name={m.icon} size={16} color={colors.white} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{m.title}</Text>
              <Text style={styles.preview} numberOfLines={1}>{m.preview}</Text>
            </View>
            <Text style={styles.date}>{m.date}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  list: { paddingHorizontal: 24, paddingTop: 12, gap: 10 },
  card: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.white, borderRadius: 14, paddingVertical: 12, paddingHorizontal: 14, shadowColor: '#2A2350', shadowOpacity: 0.08, shadowRadius: 10, shadowOffset: { width: 0, height: 3 }, elevation: 2 },
  icon: { width: 30, height: 30, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  title: { color: colors.text, fontSize: 12.5, fontWeight: '700' },
  preview: { color: colors.textSub, fontSize: 10.5, marginTop: 3 },
  date: { color: colors.textSub, fontSize: 10, alignSelf: 'flex-start' },
});
