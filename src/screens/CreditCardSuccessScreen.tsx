import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenShell } from '../components/layout';
import { TopBar, PrimaryButton } from '../components/ui';
import { PaymentSuccessIllustration } from '../components/illustrations';
import { useNavigation } from '../navigation/NavigationContext';
import { colors } from '../theme';

// Credit card #5 — Transaction successfully
export function CreditCardSuccessScreen() {
  const { navigate } = useNavigation();
  return (
    <ScreenShell>
      <TopBar title="Credit card" variant="white" onBack={() => navigate('home')} />
      <View style={styles.body}>
        <PaymentSuccessIllustration />
        <Text style={styles.title}>Transaction successfully!</Text>
        <Text style={styles.text}>You have successfully traded!</Text>
        <PrimaryButton label="Confirm" onPress={() => navigate('home')} />
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  body: { paddingHorizontal: 24, paddingTop: 10 },
  title: { color: colors.primary, fontSize: 15, fontWeight: '800', textAlign: 'center' },
  text: { color: colors.text, fontSize: 12.5, textAlign: 'center', marginTop: 12, marginBottom: 18 },
});