import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ScreenShell } from '../components/layout';
import { TopBar } from '../components/ui';
import { SavingsAccountCard } from '../components/save/SavingsAccountCard';
import { SAVINGS_ACCOUNTS } from '../data/save';
import { useNavigation } from '../navigation/NavigationContext';

export function SaveManagementScreen() {
  const { navigate } = useNavigation();
  return (
    <ScreenShell>
      <TopBar title="Management" variant="white" onBack={() => navigate('saveOnline')} />
      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {SAVINGS_ACCOUNTS.map(a => (
          <SavingsAccountCard key={a.id} account={a.account} from={a.from} to={a.to} term={a.term} rate={a.rate} />
        ))}
      </ScrollView>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  list: { paddingHorizontal: 24, paddingTop: 16 },
});