import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ScreenShell } from '../components/layout';
import { TopBar, Field, Checkbox, PrimaryButton } from '../components/ui';
import { PhoneIllustration } from '../components/illustrations';
import { useNavigation } from '../navigation/NavigationContext';
import { colors } from '../theme';

export function SignUp1Screen() {
  const { navigate } = useNavigation();
  const [name, setName] = useState('');
  const [inp, setInp] = useState('');
  const [pass, setPass] = useState('');
  const [hide, setHide] = useState(true);
  const [agree, setAgree] = useState(false);
  const active = agree && name.length > 0 && inp.length > 0 && pass.length > 0;

  return (
    <ScreenShell purple>
      <TopBar title="Sign up" onBack={() => navigate('signin')} />
      <View style={styles.sheet}>
        <Text style={styles.title}>Welcome to us,</Text>
        <Text style={styles.sub}>Hello there, create New account</Text>
        <PhoneIllustration />
        <Field value={name} onChangeText={setName} placeholder="Name" />
        <Field value={inp} onChangeText={setInp} placeholder="Test Input" />
        <Field value={pass} onChangeText={setPass} placeholder="Password" secure={hide} onToggleSecure={() => setHide(v => !v)} />
        <Checkbox checked={agree} onToggle={() => setAgree(v => !v)}>
          By creating an account your aggree to our <Text style={styles.terms}>Term and Conditions</Text>
        </Checkbox>
        <PrimaryButton label="Sign up" active={active} onPress={() => navigate('signup2')} />
        <View style={styles.foot}>
          <Text style={styles.footText}>Have an account?  </Text>
          <TouchableOpacity onPress={() => navigate('signin')}><Text style={styles.footLink}>Sign In</Text></TouchableOpacity>
        </View>
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  sheet: { flex: 1, marginTop: 12, backgroundColor: colors.bg, borderTopLeftRadius: 28, borderTopRightRadius: 28, paddingHorizontal: 24, paddingTop: 26, paddingBottom: 30 },
  title: { color: colors.primary, fontSize: 24, fontWeight: '800' },
  sub: { color: colors.text, fontSize: 13, marginTop: 4 },
  terms: { color: colors.primary, fontWeight: '600' },
  foot: { flexDirection: 'row', justifyContent: 'center', marginTop: 14 },
  footText: { color: colors.textSub, fontSize: 13 },
  footLink: { color: colors.primary, fontSize: 13, fontWeight: '700' },
});
