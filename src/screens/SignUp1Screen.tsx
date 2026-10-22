import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ScreenShell } from '../components/layout';
import { TopBar, Field, SelectField, Checkbox, PrimaryButton } from '../components/ui';
import { PhoneIllustration } from '../components/illustrations';
import { useNavigation } from '../navigation/NavigationContext';
import { colors } from '../theme';

export function SignUp1Screen() {
  const { navigate } = useNavigation();
  const [name, setName] = useState('');
  const [inp, setInp] = useState('');
  const [agree, setAgree] = useState(false);

  return (
    <ScreenShell purple>
      <TopBar title="Sign up" onBack={() => navigate('signin')} />
      <View style={styles.head}>
        <Text style={styles.title}>Welcome to us,</Text>
        <Text style={styles.sub}>Hello there, create new account</Text>
      </View>
      <PhoneIllustration />
      <View style={styles.form}>
        <Field value={name} onChangeText={setName} placeholder="Name" />
        <Field value={inp} onChangeText={setInp} placeholder="Test Input" />
        <SelectField placeholder="Select your country" />
        <Checkbox checked={agree} onToggle={() => setAgree(v => !v)}>
          By enrolling an account your agree to our <Text style={{ color: colors.primary, fontWeight: '600' }}>Term and Conditions</Text>
        </Checkbox>
        <PrimaryButton label="Sign Up" active={agree} onPress={() => navigate('signup2')} />
        <View style={styles.foot}>
          <Text style={styles.footText}>Have an account?  </Text>
          <TouchableOpacity onPress={() => navigate('signin')}><Text style={styles.footLink}>Sign In</Text></TouchableOpacity>
        </View>
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  head: { paddingHorizontal: 24, marginTop: 18 },
  title: { color: colors.white, fontSize: 26, fontWeight: '800' },
  sub: { color: 'rgba(255,255,255,0.85)', fontSize: 13, marginTop: 4 },
  form: { backgroundColor: colors.bg, borderTopLeftRadius: 28, borderTopRightRadius: 28, paddingHorizontal: 24, paddingTop: 26, paddingBottom: 30, flex: 1 },
  foot: { flexDirection: 'row', justifyContent: 'center', marginTop: 14 },
  footText: { color: colors.textSub, fontSize: 13 },
  footLink: { color: colors.primary, fontSize: 13, fontWeight: '700' },
});