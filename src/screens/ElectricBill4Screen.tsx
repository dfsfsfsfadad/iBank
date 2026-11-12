import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenShell } from '../components/layout';
import { TopBar, PrimaryButton } from '../components/ui';
import { PaymentSuccessIllustration } from '../components/illustrations';
import { electricStore } from '../data/electric';
import { useNavigation } from '../navigation/NavigationContext';
import { colors } from '../theme';

export function ElectricBill4Screen() {
  const { navigate } = useNavigation();

  const done = () => {
    electricStore.code = '';
    electricStore.account = null;
    navigate('home');
  };

  return (
    <ScreenShell>
      <TopBar title="Electric bill" variant="white" onBack={done} />
      <View style={styles.body}>
        <PaymentSuccessIllustration />
        <Text style={styles.title}>Transaction successfully!</Text>
        <Text style={styles.text}>You've paid your electric bill</Text>
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