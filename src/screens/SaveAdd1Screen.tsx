import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenShell } from '../components/layout';
import { TopBar, Card, PickField, PickerModal, Field, PrimaryButton } from '../components/ui';
import { PiggyIllustration } from '../components/illustrations';
import { DepositTermModal } from '../components/save/DepositTermModal';
import { ACCOUNTS } from '../components/transfer/TransferForm';
import { DEPOSIT_TERMS, saveStore } from '../data/save';
import { useNavigation } from '../navigation/NavigationContext';
import { colors } from '../theme';

export function SaveAdd1Screen() {
  const { navigate } = useNavigation();
  const [acc, setAcc] = useState<number | null>(saveStore.account === null ? null : 0);
  const [accOpen, setAccOpen] = useState(false);
  const [term, setTerm] = useState<number | null>(saveStore.term);
  const [termOpen, setTermOpen] = useState(false);
  const [amount, setAmount] = useState(saveStore.amount);

  const num = parseInt(amount.replace(/\D/g, ''), 10) || 0;
  const active = acc !== null && term !== null && num >= 1000;

  const verify = () => {
    saveStore.account = ACCOUNTS[acc!].label;
    saveStore.term = term;
    saveStore.amount = amount;
    navigate('saveAdd2');
  };

  return (
    <ScreenShell
      keyboard={
        <View style={styles.dock}>
          <PrimaryButton label="Verify" active={active} onPress={verify} />
        </View>
      }
    >
      <TopBar title="Add" variant="white" onBack={() => navigate('saveOnline')} />
      <PiggyIllustration />
      <Card>
        <PickField
          label="Choose account/ card"
          value={acc === null ? null : ACCOUNTS[acc].label}
          placeholder="Choose account/ card"
          onPress={() => setAccOpen(true)}
        />
        <PickField
          label="Choose time deposit"
          value={term === null ? null : DEPOSIT_TERMS[term].label}
          placeholder="Choose time deposit"
          onPress={() => setTermOpen(true)}
        />
        <Field value={amount} onChangeText={setAmount} placeholder="Amount (At least $1000)" keyboardType="numeric" />
      </Card>

      <PickerModal
        visible={accOpen}
        title="Choose account:"
        options={ACCOUNTS.map(a => a.label)}
        value={acc === null ? null : ACCOUNTS[acc].label}
        onSelect={l => { setAcc(ACCOUNTS.findIndex(a => a.label === l)); setAccOpen(false); }}
        onClose={() => setAccOpen(false)}
      />
      <DepositTermModal
        visible={termOpen}
        options={DEPOSIT_TERMS}
        value={term}
        onSelect={i => { setTerm(i); setTermOpen(false); }}
        onClose={() => setTermOpen(false)}
      />
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  dock: { paddingHorizontal: 24, paddingTop: 8, paddingBottom: 20, backgroundColor: colors.bg },
});