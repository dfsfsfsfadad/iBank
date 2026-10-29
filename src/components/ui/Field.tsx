import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius } from '../../theme';

export function Field({
  value, onChangeText, placeholder, secure, onToggleSecure, keyboardType, hideSystemKeyboard, onFocus,
}: {
  value: string; onChangeText: (t: string) => void; placeholder: string;
  secure?: boolean; onToggleSecure?: () => void;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  hideSystemKeyboard?: boolean;
  onFocus?: () => void;
}) {
  return (
    <View style={styles.wrap}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMute}
        secureTextEntry={secure}
        keyboardType={keyboardType}
        showSoftInputOnFocus={!hideSystemKeyboard}
        selectTextOnFocus={false}
        onFocus={onFocus}
        autoCapitalize="none"
      />
      {onToggleSecure && (
        <TouchableOpacity style={styles.eye} onPress={onToggleSecure}>
          <Ionicons name={secure ? 'eye-off-outline' : 'eye-outline'} size={18} color={colors.textSub} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'relative', marginBottom: 14 },
  input: { height: 50, borderRadius: radius.field, backgroundColor: colors.fieldBg, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 16, fontSize: 14, color: colors.text },
  eye: { position: 'absolute', right: 6, top: 0, height: 50, width: 40, alignItems: 'center', justifyContent: 'center' },
});
