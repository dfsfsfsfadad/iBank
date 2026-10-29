import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ScreenShell } from '../components/layout';
import { TopBar, Field, PrimaryButton, Card } from '../components/ui';
import { NumericKeyboard, useKeyboardInput } from '../components/keyboards';
import { useNavigation } from '../navigation/NavigationContext';
import { colors, radius } from '../theme';

export function Forgot4Screen() {
  const { navigate } = useNavigation();
  const [code, setCode] = useState('8422');
  const press = useKeyboardInput(setCode);

  return (
    <ScreenShell keyboard={<NumericKeyboard onPress={press} />}>
      <TopBar title="Forgot password" variant="white" onBack={() => navigate('forgot3')} />
      <Card>
        <Text style={styles.label}>Type a code</Text>
        <View style={styles.codeRow}>
          <View style={{ flex: 1 }}>
            <Field value={code} onChangeText={setCode} placeholder="Code" keyboardType="numeric" hideSystemKeyboard />
          </View>
          <TouchableOpacity style={styles.resend}><Text style={styles.resendText}>Resend</Text></TouchableOpacity>
        </View>
        <Text style={styles.helper}>
          We texted you a code to verify your phone number <Text style={styles.phone}>(+84) 0398829xxx</Text>
          {'\n'}This code will expired 10 minutes after this message. If you don't get a message.
        </Text>
        <PrimaryButton label="Change password" active={code.length > 0} onPress={() => navigate('changepw1')} />
      </Card>
      <TouchableOpacity onPress={() => navigate('forgot1')} style={styles.centerLink}>
        <Text style={styles.link}>Change your phone number</Text>
      </TouchableOpacity>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  label: { color: colors.textSub, fontSize: 13, marginBottom: 8 },
  codeRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  resend: { height: 50, paddingHorizontal: 18, borderRadius: radius.field, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  resendText: { color: colors.white, fontWeight: '700', fontSize: 13 },
  helper: { color: colors.textSub, fontSize: 12.5, lineHeight: 18, marginTop: 6, marginBottom: 14 },
  phone: { color: colors.primary, fontWeight: '700' },
  centerLink: { alignSelf: 'center', marginTop: 24 },
  link: { color: colors.primary, fontSize: 13, fontWeight: '600' },
});
