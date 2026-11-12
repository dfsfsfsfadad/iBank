import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { ScreenShell } from '../components/layout';
import { TopBar, Card, PickField, PickerModal, PrimaryButton, OtpRow } from '../components/ui';
import { CreditItemRow } from '../components/credit/CreditItemRow';
import { CREDIT_ITEMS, creditTotal } from '../data/credit';
import { ACCOUNTS } from '../components/transfer/TransferForm';
import { useNavigation } from '../navigation/NavigationContext';
import { colors } from '../theme';

export function CreditCard2Screen() {
  const { navigate } = useNavigation();
  const total = creditTotal(CREDIT_ITEMS);
  const [acc, setAcc] = useState<number | null>(null);
  const [accOpen, setAccOpen] = useState(false);
  const [otp, setOtp] = useState('');
  const active = acc !== null && otp.length > 0;

  return (
    <ScreenShell
      keyboard={
        <View style={styles.dock}>
          <PrimaryButton label="Pay" active={active} onPress={() => navigate('creditSuccess')} />
        </View>
      }
    >
      <TopBar title="Credit card" variant="white" onBack={() => navigate('creditCard')} />
      <View style={styles.body}>
        <Card>
          {CREDIT_ITEMS.map(i => <CreditItemRow key={i.id} item={i} />)}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>TOTAL</Text>
            <Text style={styles.totalValue}>-${total}</Text>
          </View>
        </Card>

        <View style={{ marginTop: 18 }}>
          <PickField
            label="Choose account/ card"
            value={acc === null ? null : ACCOUNTS[acc].label}
            placeholder="Choose account/ card"
            onPress={() => setAccOpen(true)}
          />
          <Text style={styles.label}>Get OTP to verify transaction</Text>
          {/* Макет: нақты SMS жоқ, "Get OTP" кодты автоматты түрде толтырады */}
          <OtpRow value={otp} onChangeText={setOtp} canRequest={acc !== null} onRequest={() => setOtp('23798')} />
        </View>
      </View>

      <PickerModal
        visible={accOpen}
        title="Choose account:"
        options={ACCOUNTS.map(a => a.label)}
        value={acc === null ? null : ACCOUNTS[acc].label}
        onSelect={l => { setAcc(ACCOUNTS.findIndex(a => a.label === l)); setAccOpen(false); }}
        onClose={() => setAccOpen(false)}
      />
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  body: { paddingHorizontal: 24, paddingTop: 14 },
  label: { color: colors.textSub, fontSize: 11, marginTop: 4, marginBottom: 8 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: colors.bgMuted, paddingTop: 12, marginTop: 6 },
  totalLabel: { color: colors.text, fontSize: 12, fontWeight: '800' },
  totalValue: { color: colors.red, fontSize: 18, fontWeight: '800' },
  dock: { paddingHorizontal: 24, paddingTop: 8, paddingBottom: 20, backgroundColor: colors.bg },
});