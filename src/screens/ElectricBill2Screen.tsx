import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenShell } from '../components/layout';
import { TopBar, PrimaryButton } from '../components/ui';
import { TransferSuccessIllustration } from '../components/illustrations';
import { BillCard } from '../components/bill/BillCard';
import { ELECTRIC_BILL, electricStore } from '../data/electric';
import { useNavigation } from '../navigation/NavigationContext';
import { colors } from '../theme';

export function ElectricBill2Screen() {
  const { navigate } = useNavigation();

  return (
    <ScreenShell>
      <TopBar title="Electric bill" variant="white" onBack={() => navigate('electric1')} />
      <TransferSuccessIllustration />
      <Text style={styles.period}>{ELECTRIC_BILL.from} - {ELECTRIC_BILL.to}</Text>
      <BillCard code={electricStore.code} bill={ELECTRIC_BILL} feeLabel="Electric fee" />
      <View style={styles.btn}>
        <PrimaryButton label="Pay the bill" onPress={() => navigate('electric3')} />
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  period: { color: colors.textSub, fontSize: 10.5, textAlign: 'center', marginTop: -10 },
  btn: { paddingHorizontal: 24 },
});