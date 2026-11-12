import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenShell } from '../components/layout';
import { TopBar, Card, PickField, PickerModal, PrimaryButton, OtpRow } from '../components/ui';
import { BillCard } from '../components/bill/BillCard';
import { ACCOUNTS } from '../components/transfer/TransferForm';
import { ELECTRIC_BILL, electricStore } from '../data/electric';
import { useNavigation } from '../navigation/NavigationContext';
import { colors } from '../theme';

export function ElectricBill3Screen() {
  const { navigate } = useNavigation();
  const [acc, setAcc] = useState<number | null>(null);
  const [accOpen, setAccOpen] = useState(false);
  const [otp, setOtp] = useState('');
  const active = acc !== null && otp.length > 0;

  const pay = () => {
    electricStore.account = acc === null ? null : ACCOUNTS[acc].label;
    navigate('electric4');
  };

  return (
    <ScreenShell
      keyboard={
        <View style={styles.dock}>
          <PrimaryButton label="Pay the bill" active={active} onPress={pay} />
        </View>
      }
    >
      <TopBar title="Electric bill" variant="white" onBack={() => navigate('electric2')} />
      <View style={styles.body}>
        <BillCard code={electricStore.code} bill={ELECTRIC_BILL} feeLabel="Electric fee" />
        <View style={{ marginTop: 18 }}>
          <PickField
            label="Choose account/ card"
            value={acc === null ? null : ACCOUNTS[acc].label}
            placeholder="Choose account/ card"
            onPress={() => setAccOpen(true)}
          />
          <Text style={styles.label}>Get OTP to verify transaction</Text>
          {/* Макет: нет реального SMS, "Get OTP" подставляет код */}
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
  dock: { paddingHorizontal: 24, paddingTop: 8, paddingBottom: 20, backgroundColor: colors.bg },
});