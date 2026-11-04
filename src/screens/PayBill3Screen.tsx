import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenShell } from '../components/layout';
import { TopBar, PrimaryButton } from '../components/ui';
import { PaymentSuccessIllustration } from '../components/illustrations';
import { billStore } from '../data/bill';
import { useNavigation } from '../navigation/NavigationContext';
import { colors } from '../theme';

// Pay the bill #5 — Transaction successfully
export function PayBill3Screen() {
  const { navigate } = useNavigation();

  const done = () => {
    billStore.company = null;
    billStore.code = '';
    navigate('home');
  };

  return (
    <ScreenShell>
      <TopBar title="Internet bill" variant="white" onBack={done} />
      <View style={styles.body}>
        <PaymentSuccessIllustration />
        <Text style={styles.title}>Transaction successfully!</Text>
        <Text style={styles.text}>You've paid your internet bill!</Text>
        <PrimaryButton label="Confirm" onPress={done} />
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  body: { paddingHorizontal: 24, paddingTop: 10 },
  title: { color: colors.primary, fontSize: 15, fontWeight: '800', textAlign: 'center' },
  text: { color: colors.text, fontSize: 12.5, textAlign: 'center', marginTop: 12, marginBottom: 18 },
});
