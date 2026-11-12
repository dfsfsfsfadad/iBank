import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenShell } from '../components/layout';
import { TopBar, Card, ReadField, PrimaryButton } from '../components/ui';
import { PiggyIllustration } from '../components/illustrations';
import { DEPOSIT_TERMS, saveStore } from '../data/save';
import { useNavigation } from '../navigation/NavigationContext';
import { colors } from '../theme';

export function SaveAdd2Screen() {
  const { navigate } = useNavigation();
  const term = saveStore.term !== null ? DEPOSIT_TERMS[saveStore.term] : null;
  const rate = term ? term.rate : '';

  return (
    <ScreenShell
      keyboard={
        <View style={styles.dock}>
          <PrimaryButton label="Verify" onPress={() => navigate('saveSuccess')} />
        </View>
      }
    >
      <TopBar title="Add" variant="white" onBack={() => navigate('saveAdd1')} />
      <PiggyIllustration />
      <Card>
        <ReadField label="Account" value={saveStore.account ?? ''} />
        <ReadField label="Time deposit" value={term ? `${term.months} months` : ''} />
        <ReadField label="Amount" value={`$ ${saveStore.amount}`} />
        <Text style={styles.hint}>Interest rate {rate} / {term?.months} months</Text>
      </Card>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  hint: { color: colors.primary, fontSize: 10, fontWeight: '700', marginTop: -4 },
  dock: { paddingHorizontal: 24, paddingTop: 8, paddingBottom: 20, backgroundColor: colors.bg },
});