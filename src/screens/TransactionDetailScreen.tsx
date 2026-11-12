import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { ScreenShell } from '../components/layout';
import { TopBar, Card } from '../components/ui';
import { BillCard } from '../components/bill/BillCard';
import { ELECTRIC_BILL } from '../data/electric';
import { findTxn, money, txnStore } from '../data/report';
import { useNavigation } from '../navigation/NavigationContext';
import { colors } from '../theme';

export function TransactionDetailScreen() {
  const { navigate } = useNavigation();
  const txn = findTxn(txnStore.id);
  const isBill = !!txn && /bill/i.test(txn.title);
  const isElectric = !!txn && /electric/i.test(txn.title);

  return (
    <ScreenShell>
      <TopBar title={txn?.title ?? 'Transaction'} variant="white" onBack={() => navigate('report')} />
      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        {isBill ? (
          <BillCard
            code="23435"
            bill={isElectric ? ELECTRIC_BILL : undefined}
            feeLabel={isElectric ? 'Electric fee' : 'Internet fee'}
          />
        ) : (
          <Card>
            <Row label="Transaction" value={txn?.title ?? '-'} />
            <Row label="Status" value={txn?.ok ? 'Successfully' : 'Unsuccessfully'} />
            <Row label="Amount" value={txn ? money(txn.amount) : '-'} />
          </Card>
        )}
      </ScrollView>
    </ScreenShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  body: { paddingHorizontal: 24, paddingTop: 14, paddingBottom: 24 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
  label: { color: colors.textSub, fontSize: 12 },
  value: { color: colors.text, fontSize: 12, fontWeight: '700' },
});