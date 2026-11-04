import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenShell } from '../components/layout';
import { TopBar, PrimaryButton, Card, Dropdown, OtpRow } from '../components/ui';
import { TransferSuccessIllustration } from '../components/illustrations';
import { BillCard } from '../components/bill/BillCard';
import { BILL, BILL_ACCOUNTS, billStore } from '../data/bill';
import { useNavigation } from '../navigation/NavigationContext';
import { colors } from '../theme';

// Pay the bill #2–#4 — төлем туралы мәлімет, шот таңдау, OTP
export function PayBill2Screen() {
  const { navigate } = useNavigation();
  const [account, setAccount] = useState<string | null>(null);
  const [otp, setOtp] = useState('');
  const active = !!account && otp.length > 0;

  return (
    <ScreenShell>
      <TopBar title="Internet bill" variant="white" onBack={() => navigate('paybill1')} />
      <TransferSuccessIllustration />
      <Text style={styles.period}>{BILL.from} - {BILL.to}</Text>

      <BillCard code={billStore.code} />

      <Card>
        <Dropdown value={account} placeholder="Choose account/ card" options={BILL_ACCOUNTS} onSelect={setAccount} />
        <Text style={styles.label}>Get OTP to verify transaction</Text>
        {/* Макет: нақты SMS жоқ, "Get OTP" кодты автоматты түрде толтырады */}
        <OtpRow value={otp} onChangeText={setOtp} canRequest={!!account} onRequest={() => setOtp('23798')} />
        <PrimaryButton label="Pay the bill" active={active} onPress={() => navigate('paybill3')} />
      </Card>
      <View style={{ height: 8 }} />
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  period: { color: colors.textSub, fontSize: 10.5, textAlign: 'center', marginTop: -10 },
  label: { color: colors.textSub, fontSize: 12, marginBottom: 8 },
});
