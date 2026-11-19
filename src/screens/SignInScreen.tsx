import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenShell } from '../components/layout';
import { TopBar, Field, PrimaryButton } from '../components/ui';
import { LockIllustration } from '../components/illustrations';
import { login } from '../data/auth';
import { useNavigation } from '../navigation/NavigationContext';
import { colors } from '../theme';

export function SignInScreen() {
  const { navigate } = useNavigation();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [hide, setHide] = useState(true);
  const [loading, setLoading] = useState(false);
  const active = email.length > 0 && pass.length > 0 && !loading;

  const submit = async () => {
    setLoading(true);
    try {
      await login(email.trim(), pass);
      navigate('home');
    } catch (e) {
      Alert.alert('Кіру қатесі', e instanceof Error ? e.message : 'Белгісіз қате');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenShell purple>
      <TopBar title="Sign in" onBack={() => navigate('home')} />
      <View style={styles.sheet}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.sub}>Hello there, sign in to continue</Text>
        <LockIllustration />
        <Field value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" />
        <Field value={pass} onChangeText={setPass} placeholder="Password" secure={hide} onToggleSecure={() => setHide(v => !v)} />
        <TouchableOpacity style={styles.linkRight} onPress={() => navigate('forgot1')}>
          <Text style={styles.link}>Forgot your password ?</Text>
        </TouchableOpacity>
        <PrimaryButton label={loading ? 'Please wait...' : 'Sign In'} active={active} onPress={submit} />
        <View style={styles.bio}><Ionicons name="finger-print" size={52} color={colors.primary} /></View>
        <View style={styles.foot}>
          <Text style={styles.footText}>Don't have an account?  </Text>
          <TouchableOpacity onPress={() => navigate('signup1')}><Text style={styles.footLink}>Sign Up</Text></TouchableOpacity>
        </View>
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  sheet: { flex: 1, marginTop: 12, backgroundColor: colors.bg, borderTopLeftRadius: 28, borderTopRightRadius: 28, paddingHorizontal: 24, paddingTop: 26, paddingBottom: 30 },
  title: { color: colors.primary, fontSize: 24, fontWeight: '800' },
  sub: { color: colors.text, fontSize: 13, marginTop: 4 },
  linkRight: { alignSelf: 'flex-end', marginBottom: 16, marginTop: -4 },
  link: { color: colors.textSub, fontSize: 12.5, fontWeight: '600' },
  bio: { alignSelf: 'center', marginVertical: 18 },
  foot: { flexDirection: 'row', justifyContent: 'center', marginTop: 14 },
  footText: { color: colors.textSub, fontSize: 13 },
  footLink: { color: colors.primary, fontSize: 13, fontWeight: '700' },
});