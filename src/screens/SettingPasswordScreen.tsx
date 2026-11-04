import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { ScreenShell } from '../components/layout';
import { TopBar, Field, PrimaryButton, Card } from '../components/ui';
import { useNavigation } from '../navigation/NavigationContext';
import { colors } from '../theme';


export function SettingPasswordScreen() {
  const { navigate } = useNavigation();
  const [recent, setRecent] = useState('');
  const [pw, setPw] = useState('');
  const [cf, setCf] = useState('');
  const active = recent.length > 0 && pw.length > 0 && pw === cf;

  return (
    <ScreenShell>
      <TopBar title="Change password" variant="white" onBack={() => navigate('setting')} />
      <Card>
        <Text style={styles.label}>Recent password</Text>
        <Field value={recent} onChangeText={setRecent} placeholder="Recent password" secure />
        <Text style={styles.label}>New password</Text>
        <Field value={pw} onChangeText={setPw} placeholder="New password" secure />
        <Text style={styles.label}>Confirm new password</Text>
        <Field value={cf} onChangeText={setCf} placeholder="Confirm new password" secure />
        <PrimaryButton label="Change password" active={active} onPress={() => navigate('changepw2')} />
      </Card>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  label: { color: colors.textSub, fontSize: 11, marginBottom: 6 },
});
