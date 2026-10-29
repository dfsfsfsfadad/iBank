import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { ScreenShell } from '../components/layout';
import { TopBar, Field, PrimaryButton, Card } from '../components/ui';
import { QwertyKeyboard, useKeyboardInput } from '../components/keyboards';
import { useNavigation } from '../navigation/NavigationContext';
import { colors } from '../theme';

export function ChangePassword1Screen() {
  const { navigate } = useNavigation();
  const [pw, setPw] = useState('');
  const [cf, setCf] = useState('');
  const [hidePw, setHidePw] = useState(true);
  const [hideCf, setHideCf] = useState(true);
  const [focus, setFocus] = useState<'pw' | 'cf'>('pw');
  const pressPw = useKeyboardInput(setPw);
  const pressCf = useKeyboardInput(setCf);
  const press = (k: string) => (focus === 'pw' ? pressPw(k) : pressCf(k));
  const active = pw.length > 0 && pw === cf;

  return (
    <ScreenShell keyboard={<QwertyKeyboard onPress={press} />}>
      <TopBar title="Change password" variant="white" onBack={() => navigate('forgot4')} />
      <Card>
        <Text style={styles.label}>Type your new password</Text>
        <Field value={pw} onChangeText={setPw} placeholder="Password" secure={hidePw}
          onToggleSecure={() => setHidePw(v => !v)} onFocus={() => setFocus('pw')} hideSystemKeyboard />
        <Text style={styles.label}>Confirm password</Text>
        <Field value={cf} onChangeText={setCf} placeholder="Confirm password" secure={hideCf}
          onToggleSecure={() => setHideCf(v => !v)} onFocus={() => setFocus('cf')} hideSystemKeyboard />
        <PrimaryButton label="Change password" active={active} onPress={() => navigate('changepw2')} />
      </Card>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  label: { color: colors.textSub, fontSize: 13, marginBottom: 8 },
});
