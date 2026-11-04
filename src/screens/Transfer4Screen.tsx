import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenShell } from '../components/layout';
import { TopBar, PrimaryButton } from '../components/ui';
import { TransferSuccessIllustration } from '../components/illustrations';
import { FILLED_TRANSFER, transferStore } from '../components/transfer/TransferForm';
import { useNavigation } from '../navigation/NavigationContext';
import { colors } from '../theme';

// Transfer #5 — Successfully
export function Transfer4Screen() {
  const { navigate } = useNavigation();
  const v = transferStore.values;
  const amount = '$' + v.amount.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const done = () => {
    transferStore.values = FILLED_TRANSFER;
    navigate('home');
  };

  return (
    <ScreenShell>
      <TopBar title="Confirm" variant="white" onBack={done} />
      <View style={styles.body}>
        <TransferSuccessIllustration />
        <Text style={styles.title}>Transfer successful!</Text>
        <Text style={styles.text}>
          You have successfully transferred{'\n'}
          <Text style={styles.amount}>{amount}</Text> to <Text style={styles.name}>{v.name}</Text>!
        </Text>
        <PrimaryButton label="Confirm" onPress={done} />
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  body: { paddingHorizontal: 24, paddingTop: 10 },
  title: { color: colors.primary, fontSize: 15, fontWeight: '800', textAlign: 'center' },
  text: { color: colors.text, fontSize: 12.5, textAlign: 'center', lineHeight: 20, marginTop: 14, marginBottom: 18 },
  amount: { color: colors.red, fontWeight: '800' },
  name: { color: colors.primary, fontWeight: '800' },
});
