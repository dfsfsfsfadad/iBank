import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenShell } from '../components/layout';
import { TopBar, PrimaryButton, ReadField } from '../components/ui';
import { BiometricVerify, TouchIdDialog } from '../components/transfer/BiometricVerify';
import { ACCOUNTS, transferStore } from '../components/transfer/TransferForm';
import { useNavigation } from '../navigation/NavigationContext';
import { colors } from '../theme';

const FEE = '10$';
const BENEFICIARY_BANK = 'US bank';

// Transfer #5 — Confirm #4…#7
//  • карта нөмірі / сол банк → Touch ID (Confirm #4, #5)
//  • басқа банк (tx = 2)     → Face ID  (Confirm #6, #7)
export function Transfer3Screen() {
  const { navigate } = useNavigation();
  const v = transferStore.values;
  const face = v.tx === 2;
  const [verified, setVerified] = useState(false);
  const [dialog, setDialog] = useState(false);

  const from = v.acc === null ? '' : `**** **** ${ACCOUNTS[v.acc].label.slice(-4)}`;
  const onBio = () => (face ? setVerified(true) : setDialog(true));

  return (
    <ScreenShell
      keyboard={
        <View style={styles.dock}>
          <PrimaryButton label="Confirm" active={verified} onPress={() => navigate('transfer4')} />
        </View>
      }
    >
      <TopBar title="Confirm" variant="white" onBack={() => navigate('transfer2')} />
      <View style={styles.body}>
        <Text style={styles.heading}>Confirm transaction information</Text>
        <ReadField label="From" value={from} />
        <ReadField label="To" value={v.name} />
        {face && <ReadField label="Beneficiary bank" value={BENEFICIARY_BANK} />}
        <ReadField label="Card number" value={v.card} />
        <ReadField label="Transaction fee" value={FEE} />
        <ReadField label="Content" value={v.content} />
        <ReadField label="Amount" value={`$${v.amount}`} />
        <BiometricVerify kind={face ? 'face' : 'touch'} verified={verified} onPress={onBio} />
      </View>
      <TouchIdDialog
        visible={dialog}
        onSuccess={() => { setVerified(true); setDialog(false); }}
        onCancel={() => setDialog(false)}
      />
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  body: { paddingHorizontal: 24, paddingTop: 14 },
  heading: { color: colors.textSub, fontSize: 11, marginBottom: 14 },
  dock: { paddingHorizontal: 24, paddingTop: 8, paddingBottom: 20, backgroundColor: colors.bg },
});
