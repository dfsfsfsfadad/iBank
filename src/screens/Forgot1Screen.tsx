import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenShell } from '../components/layout';
import { TopBar, Field, PrimaryButton } from '../components/ui';
import { NumericKeyboard, useKeyboardInput } from '../components/keyboards';
import { useNavigation } from '../navigation/NavigationContext';
import { colors } from '../theme';

export function Forgot1Screen() {
  const { navigate } = useNavigation();
  const [phone, setPhone] = useState('');
  const press = useKeyboardInput(setPhone);

  return (
    <ScreenShell keyboard={<NumericKeyboard onPress={press} />}>   {/* клава теперь пропом, приклеена снизу */}
      <TopBar title="Forgot password" variant="white" onBack={() => navigate('signin')} />
      <View style={styles.body}>
        <Text style={styles.label}>Type your phone number</Text>
        <Field value={phone} onChangeText={setPhone} placeholder="(84)" keyboardType="phone-pad" hideSystemKeyboard />
        <Text style={styles.helper}>We texted you a code to verify your phone number</Text>
        <PrimaryButton label="Send" active={phone.length > 0} onPress={() => navigate('forgot2')} />
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  body: { paddingHorizontal: 24, paddingTop: 18 },
  label: { color: colors.textSub, fontSize: 13, marginBottom: 8, marginTop: 4 },
  helper: { color: colors.textSub, fontSize: 12.5, lineHeight: 18, marginTop: 6, marginBottom: 14 },
});