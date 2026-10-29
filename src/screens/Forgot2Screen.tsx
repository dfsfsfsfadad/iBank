import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenShell } from '../components/layout';
import { TopBar, Field, PrimaryButton } from '../components/ui';
import { useNavigation } from '../navigation/NavigationContext';
import { colors } from '../theme';

export function Forgot2Screen() {
  const { navigate } = useNavigation();
  const [phone, setPhone] = useState('(+44) 2288828xx');

  return (
    <ScreenShell>
      <TopBar title="Forgot password" variant="white" onBack={() => navigate('forgot1')} />
      <View style={styles.body}>
        <Text style={styles.label}>Type your phone number</Text>
        <Field value={phone} onChangeText={setPhone} placeholder="(44)" keyboardType="phone-pad" />
        <Text style={styles.helper}>We texted you a code to verify your phone number</Text>
        <PrimaryButton label="Send" active onPress={() => navigate('forgot3')} />
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  body: { paddingHorizontal: 24, paddingTop: 18 },
  label: { color: colors.textSub, fontSize: 13, marginBottom: 8, marginTop: 4 },
  helper: { color: colors.textSub, fontSize: 12.5, lineHeight: 18, marginTop: 6, marginBottom: 14 },
});