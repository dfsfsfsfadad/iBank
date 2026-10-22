import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenShell } from '../components/layout';
import { TopBar, Field, PrimaryButton } from '../components/ui';
import { LockIllustration } from '../components/illustrations';
import { useNavigation } from '../navigation/NavigationContext';
import { colors } from '../theme';

export function SignInScreen() {
  const { navigate } = useNavigation();
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');
  const [hide, setHide] = useState(true);
  const active = login.length > 0 && pass.length > 0;

  return (
    <ScreenShell purple>
      <TopBar title="Sign in" onBack={() => navigate('home')} />
      <View style={styles.head}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.sub}>Hello there, sign in to continue</Text>
      </View>
      <LockIllustration />
      <View style={styles.form}>
        <Field value={login} onChangeText={setLogin} placeholder="Test Input" />
        <Field value={pass} onChangeText={setPass} placeholder="Password" secure={hide} onToggleSecure={() => setHide(v => !v)} />
        <TouchableOpacity style={styles.linkRight} onPress={() => navigate('forgot1')}>
          <Text style={styles.link}>Forgot your password?</Text>
        </TouchableOpacity>
        <PrimaryButton label="Sign In" active={active} onPress={() => navigate('home')} />
        <View style={styles.bio}><Ionicons name="finger-print" size={34} color={colors.primary} /></View>
        <View style={styles.foot}>
          <Text style={styles.footText}>Don't have an account?  </Text>
          <TouchableOpacity onPress={() => navigate('signup1')}><Text style={styles.footLink}>Sign Up</Text></TouchableOpacity>
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
  linkRight: { alignSelf: 'flex-end', marginBottom: 16, marginTop: -4 },
  link: { color: colors.primary, fontSize: 13, fontWeight: '600' },
  bio: { alignSelf: 'center', marginVertical: 18, opacity: 0.9 },
  foot: { flexDirection: 'row', justifyContent: 'center', marginTop: 14 },
  footText: { color: colors.textSub, fontSize: 13 },
  footLink: { color: colors.primary, fontSize: 13, fontWeight: '700' },
});