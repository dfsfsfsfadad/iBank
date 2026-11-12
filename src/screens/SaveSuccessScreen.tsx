import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenShell } from '../components/layout';
import { TopBar, PrimaryButton } from '../components/ui';
import { PiggyIllustration } from '../components/illustrations';
import { saveStore } from '../data/save';
import { useNavigation } from '../navigation/NavigationContext';
import { colors } from '../theme';

export function SaveSuccessScreen() {
  const { navigate } = useNavigation();

  const done = () => {
    saveStore.account = null;
    saveStore.term = null;
    saveStore.amount = '';
    navigate('home');
  };

  return (
    <ScreenShell>
      <TopBar title="Add" variant="white" onBack={done} />
      <View style={styles.body}>
        <PiggyIllustration />
        <Text style={styles.title}>Save online successfully!</Text>
        <Text style={styles.text}>{'Congratulations!\nYou have save money online successfully!'}</Text>
        <PrimaryButton label="Confirm" onPress={done} />
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  body: { paddingHorizontal: 24, paddingTop: 10 },
  title: { color: colors.primary, fontSize: 14, fontWeight: '800', textAlign: 'center' },
  text: { color: colors.text, fontSize: 12, textAlign: 'center', lineHeight: 20, marginTop: 12, marginBottom: 18 },
});