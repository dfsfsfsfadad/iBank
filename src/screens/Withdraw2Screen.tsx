import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenShell } from '../components/layout';
import { TopBar, PrimaryButton } from '../components/ui';
import { WithdrawIllustration } from '../components/illustrations';
import { useNavigation } from '../navigation/NavigationContext';
import { colors } from '../theme';

// Withdraw #6 — Successful withdrawal
export function Withdraw2Screen() {
  const { navigate } = useNavigation();
  const done = () => navigate('home');

  return (
    <ScreenShell>
      <TopBar title="" variant="white" onBack={() => navigate('withdraw1')} />
      <View style={styles.body}>
        <WithdrawIllustration />
        <Text style={styles.title}>Successful withdrawal!</Text>
        <Text style={styles.text}>
          You have successfully withdrawn money!{'\n'}Please check the balance in the card management section.
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
});
