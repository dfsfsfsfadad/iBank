import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenShell } from '../components/layout';
import { TopBar, PrimaryButton } from '../components/ui';
import { BankCard } from '../components/cards/BankCard';
import { BANK_ACCOUNTS } from '../data/report';
import { useNavigation } from '../navigation/NavigationContext';
import { colors, radius } from '../theme';

type Tab = 'account' | 'card';

// Account & card #1 (Account) и #2 (Card)
export function AccountCardScreen() {
  const { navigate } = useNavigation();
  const [tab, setTab] = useState<Tab>('account');

  const addCard = () => Alert.alert('Add card', 'This feature is not available yet.');

  return (
    <ScreenShell
      keyboard={
        tab === 'card' ? (
          <View style={styles.dock}>
            <PrimaryButton label="Add card" onPress={addCard} />
          </View>
        ) : undefined
      }
    >
      <TopBar title="Account and card" variant="white" onBack={() => navigate('home')} />

      <View style={styles.tabs}>
        {(['account', 'card'] as const).map(t => {
          const on = tab === t;
          return (
            <TouchableOpacity key={t} style={[styles.tab, on && styles.tabOn]} activeOpacity={0.8} onPress={() => setTab(t)}>
              <Text style={[styles.tabText, on && styles.tabTextOn]}>{t === 'account' ? 'Account' : 'Card'}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {tab === 'account' ? (
        <View style={styles.body}>
          <View style={styles.avatar}><Ionicons name="person" size={40} color={colors.primary} /></View>
          <Text style={styles.name}>Push Puttichai</Text>
          {BANK_ACCOUNTS.map(a => (
            <View key={a.title} style={styles.acc}>
              <View style={styles.accHead}>
                <Text style={styles.accTitle}>{a.title}</Text>
                <Text style={styles.accNumber}>{a.number}</Text>
              </View>
              <View style={styles.accRow}>
                <Text style={styles.accLabel}>Available balance</Text>
                <Text style={styles.accValue}>{a.balance}</Text>
              </View>
              <View style={styles.accRow}>
                <Text style={styles.accLabel}>Branch</Text>
                <Text style={styles.accValue}>{a.branch}</Text>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.body}>
          <TouchableOpacity activeOpacity={0.9} onPress={() => navigate('carddetail')}>
            <BankCard />
          </TouchableOpacity>
          <View style={{ height: 16 }} />
          <TouchableOpacity activeOpacity={0.9} onPress={() => navigate('carddetail')}>
            <BankCard variant="orange" />
          </TouchableOpacity>
        </View>
      )}
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  tabs: { flexDirection: 'row', gap: 12, paddingHorizontal: 24, paddingTop: 14 },
  tab: { flex: 1, height: 36, borderRadius: radius.pill, backgroundColor: '#EDEEF6', alignItems: 'center', justifyContent: 'center' },
  tabOn: { backgroundColor: colors.primary },
  tabText: { color: colors.textSub, fontSize: 12 },
  tabTextOn: { color: colors.white, fontWeight: '700' },
  body: { paddingHorizontal: 24, paddingTop: 18 },
  avatar: { alignSelf: 'center', width: 84, height: 84, borderRadius: 999, backgroundColor: colors.lavender, alignItems: 'center', justifyContent: 'center' },
  name: { color: colors.primary, fontSize: 12, fontWeight: '700', textAlign: 'center', marginTop: 10, marginBottom: 18 },
  acc: { backgroundColor: colors.white, borderRadius: 16, padding: 14, marginBottom: 14, shadowColor: '#2A2350', shadowOpacity: 0.08, shadowRadius: 10, shadowOffset: { width: 0, height: 3 }, elevation: 2 },
  accHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  accTitle: { color: colors.text, fontSize: 12, fontWeight: '700' },
  accNumber: { color: colors.text, fontSize: 12, fontWeight: '700' },
  accRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 3 },
  accLabel: { color: colors.textSub, fontSize: 9.5 },
  accValue: { color: colors.primary, fontSize: 9.5, fontWeight: '700' },
  dock: { paddingHorizontal: 24, paddingTop: 8, paddingBottom: 20, backgroundColor: colors.bg },
});
