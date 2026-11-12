import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { ScreenShell } from '../components/layout';
import { TopBar, PrimaryButton } from '../components/ui';
import { BankCard } from '../components/cards/BankCard';
import { CreditItemRow } from '../components/credit/CreditItemRow';
import { CREDIT_ITEMS, creditTotal } from '../data/credit';
import { useNavigation } from '../navigation/NavigationContext';
import { colors } from '../theme';

export function CreditCard1Screen() {
  const { navigate } = useNavigation();
  const total = creditTotal(CREDIT_ITEMS);

  return (
    <ScreenShell purple>
      <TopBar title="Credit card" onBack={() => navigate('home')} />
      <View style={styles.cardZone}>
        <BankCard stack />
      </View>
      <View style={styles.sheet}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 12 }}>
          <View style={styles.list}>
            {CREDIT_ITEMS.map(i => <CreditItemRow key={i.id} item={i} />)}
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>TOTAL</Text>
              <Text style={styles.totalValue}>-${total}</Text>
            </View>
          </View>
        </ScrollView>
        <PrimaryButton label="Pay" onPress={() => navigate('creditPay')} />
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  cardZone: { paddingHorizontal: 24, paddingTop: 14, zIndex: 2 },
  sheet: { flex: 1, marginTop: -70, paddingTop: 92, paddingHorizontal: 24, paddingBottom: 16, backgroundColor: colors.white, borderTopLeftRadius: 28, borderTopRightRadius: 28 },
  list: { backgroundColor: colors.white, borderRadius: 18, padding: 14, shadowColor: '#2A2350', shadowOpacity: 0.08, shadowRadius: 10, shadowOffset: { width: 0, height: 3 }, elevation: 2 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: colors.bgMuted, marginTop: 6, paddingTop: 12 },
  totalLabel: { color: colors.text, fontSize: 12, fontWeight: '800' },
  totalValue: { color: colors.red, fontSize: 18, fontWeight: '800' },
});