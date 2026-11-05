import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenShell } from '../components/layout';
import { TopBar } from '../components/ui';
import { BankCard } from '../components/cards/BankCard';
import { BalanceChart } from '../components/report/BalanceChart';
import { CHART, TXN_SECTIONS, money } from '../data/report';
import { useNavigation } from '../navigation/NavigationContext';
import { colors } from '../theme';

// Transaction report #1–#2 (второй макет — это тот же экран, прокрученный вниз)
export function ReportScreen() {
  const { navigate } = useNavigation();
  return (
    <ScreenShell purple>
      <TopBar title="Transaction report" onBack={() => navigate('home')} />
      <View style={styles.cardZone}>
        <BankCard stack />
      </View>

      <View style={styles.sheet}>
        <View style={styles.balance}>
          <Text style={styles.balLabel}>Balance</Text>
          <View style={styles.balRow}>
            <Text style={styles.balValue}>1000</Text>
            <Text style={styles.balCur}> USD</Text>
          </View>
          <BalanceChart data={CHART} active="Apr" />
        </View>

        {TXN_SECTIONS.map(s => (
          <View key={s.day}>
            <Text style={styles.day}>{s.day}</Text>
            {s.items.map(t => (
              <View key={t.id} style={styles.row}>
                <View style={[styles.icon, { backgroundColor: t.color }]}>
                  <Ionicons name={t.icon} size={15} color={colors.white} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.title}>{t.title}</Text>
                  <Text style={styles.status}>{t.ok ? 'Successfully' : 'Unsuccessfully'}</Text>
                </View>
                <Text style={[styles.amount, { color: t.amount < 0 ? colors.red : colors.primary }]}>{money(t.amount)}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  cardZone: { paddingHorizontal: 24, paddingTop: 14, zIndex: 2 },
  sheet: { flex: 1, marginTop: -70, paddingTop: 92, paddingHorizontal: 24, backgroundColor: colors.white, borderTopLeftRadius: 28, borderTopRightRadius: 28 },
  balance: { backgroundColor: colors.white, borderRadius: 22, padding: 16, marginBottom: 18, shadowColor: '#2A2350', shadowOpacity: 0.1, shadowRadius: 14, shadowOffset: { width: 0, height: 4 }, elevation: 4 },
  balLabel: { color: colors.text, fontSize: 10.5, fontWeight: '700' },
  balRow: { flexDirection: 'row', alignItems: 'baseline', marginTop: 4 },
  balValue: { color: colors.primary, fontSize: 24, fontWeight: '800' },
  balCur: { color: colors.textSub, fontSize: 9 },
  day: { color: colors.textSub, fontSize: 10, marginTop: 10, marginBottom: 6 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.bgMuted },
  icon: { width: 28, height: 28, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  title: { color: colors.text, fontSize: 12, fontWeight: '700' },
  status: { color: colors.textSub, fontSize: 9, marginTop: 2 },
  amount: { fontSize: 12, fontWeight: '800' },
});
