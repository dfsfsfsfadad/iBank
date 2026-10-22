import React from 'react';
import { View, ScrollView, StatusBar, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';

export function ScreenShell({
  children, purple, keyboard,
}: {
  children: React.ReactNode; purple?: boolean; keyboard?: React.ReactNode;
}) {
  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={[styles.shell, { backgroundColor: purple ? colors.primary : colors.bg }]}>
      <StatusBar barStyle={purple ? 'light-content' : 'dark-content'} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>
            {children}
          </ScrollView>
          {/* клавиатура вне скролла = приклеена к низу, как в макете */}
          {keyboard ? <View style={styles.dock}>{keyboard}</View> : null}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  shell: { flex: 1 },
  content: { flexGrow: 1, paddingBottom: 24 },
  dock: { flexShrink: 0 },
});