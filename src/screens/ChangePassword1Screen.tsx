import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenShell } from '../components/layout';
import { TopBar, PrimaryButton } from '../components/ui';
import { QwertyKeyboard, useKeyboardInput } from '../components/keyboards';
import { useNavigation } from '../navigation/NavigationContext';
import { colors, radius } from '../theme';

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
  const active = pw.length > 0 && cf.length > 0 && pw === cf;

  const pwRef = useRef<TextInput>(null);
  const cfRef = useRef<TextInput>(null);

  return (
    <ScreenShell>
      <TopBar title="Change password" variant="white" onBack={() => navigate('forgot4')} />
      <View style={styles.body}>
        <Text style={styles.label}>Type your new password</Text>
        <View style={styles.fieldWrap}>
          <TextInput ref={pwRef} style={styles.input} value={pw} onChangeText={setPw} onFocus={() => setFocus('pw')} placeholder="Password" placeholderTextColor={colors.textMute} secureTextEntry={hidePw} />
          <TouchableOpacity style={styles.eye} onPress={() => setHidePw(v => !v)}><Ionicons name={hidePw ? 'eye-off-outline' : 'eye-outline'} size={18} color={colors.textSub} /></TouchableOpacity>
        </View>
        <Text style={styles.label}>Confirm password</Text>
        <View style={styles.fieldWrap}>
          <TextInput ref={cfRef} style={styles.input} value={cf} onChangeText={setCf} onFocus={() => setFocus('cf')} placeholder="Confirm password" placeholderTextColor={colors.textMute} secureTextEntry={hideCf} />
          <TouchableOpacity style={styles.eye} onPress={() => setHideCf(v => !v)}><Ionicons name={hideCf ? 'eye-off-outline' : 'eye-outline'} size={18} color={colors.textSub} /></TouchableOpacity>
        </View>
        <PrimaryButton label="Change password" active={active} onPress={() => navigate('changepw2')} />
      </View>
      <QwertyKeyboard onPress={press} />
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  body: { paddingHorizontal: 24, paddingTop: 18 },
  label: { color: colors.textSub, fontSize: 13, marginBottom: 8, marginTop: 4 },
  fieldWrap: { position: 'relative', marginBottom: 14 },
  input: { height: 50, borderRadius: radius.field, backgroundColor: colors.fieldBg, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 16, fontSize: 14, color: colors.text },
  eye: { position: 'absolute', right: 6, top: 0, height: 50, width: 40, alignItems: 'center', justifyContent: 'center' },
});