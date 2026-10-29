import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { ScreenShell } from '../components/layout';
import { TopBar, Field, PrimaryButton, Card } from '../components/ui';
import { NumericKeyboard, useKeyboardInput } from '../components/keyboards';
import { useNavigation } from '../navigation/NavigationContext';
import { colors } from '../theme';

export function Forgot2Screen() {
  const { navigate } = useNavigation();
  const [phone, setPhone] = useState('(+84) 0398829xxx');
  const press = useKeyboardInput(setPhone);

  return (
    <ScreenShell keyboard={<NumericKeyboard onPress={press} />}>
      <TopBar title="Forgot password" variant="white" onBack={() => navigate('forgot1')} />
      <Card>
        <Text style={styles.label}>Type your phone number</Text>
        <Field value={phone} onChangeText={setPhone} placeholder="(84)" keyboardType="phone-pad" hideSystemKeyboard />
        <Text style={styles.helper}>We texted you a code to verify your phone number</Text>
        <PrimaryButton label="Send" active={phone.length > 0} onPress={() => navigate('forgot3')} />
      </Card>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  label: { color: colors.textSub, fontSize: 13, marginBottom: 8 },
  helper: { color: colors.textSub, fontSize: 12.5, lineHeight: 18, marginTop: 6, marginBottom: 14 },
});
