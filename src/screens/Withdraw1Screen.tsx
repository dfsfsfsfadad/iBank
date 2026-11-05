import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ScreenShell } from '../components/layout';
import { TopBar, Field, PrimaryButton, PickField, PickerModal, AmountGrid } from '../components/ui';
import { WithdrawIllustration } from '../components/illustrations';
import { ACCOUNTS } from '../components/transfer/TransferForm';
import { WITHDRAW_AMOUNTS, OTHER, digits } from '../data/withdraw';
import { useNavigation } from '../navigation/NavigationContext';
import { colors } from '../theme';

// Withdraw #1–#5 — одна форма в разных состояниях
export function Withdraw1Screen() {
  const { navigate } = useNavigation();
  const [acc, setAcc] = useState<number | null>(null);
  const [pickOpen, setPickOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [preset, setPreset] = useState<string | null>(null);
  const [custom, setCustom] = useState('');

  const other = preset === OTHER;
  const amount = other ? custom : preset ?? '';
  const active = acc !== null && phone.length > 0 && digits(amount) > 0;

  return (
    <ScreenShell
      keyboard={
        <View style={styles.dock}>
          <PrimaryButton label="Verify" active={active} onPress={() => navigate('withdraw2')} />
        </View>
      }
    >
      <TopBar title="Withdraw" variant="white" onBack={() => navigate('home')} />
      <WithdrawIllustration />
      <View style={styles.body}>
        <PickField
          label="Account / card"
          value={acc === null ? null : ACCOUNTS[acc].label}
          placeholder="Choose account/ card"
          onPress={() => setPickOpen(true)}
        />
        {acc !== null && <Text style={styles.balance}>Available balance: {ACCOUNTS[acc].balance}</Text>}
        <Field label="Phone number" value={phone} onChangeText={setPhone} placeholder="Phone number" keyboardType="phone-pad" />

        <Text style={styles.label}>Choose amount</Text>
        {other ? (
          <>
            <Field value={custom} onChangeText={setCustom} placeholder="Amount" keyboardType="numeric" />
            <TouchableOpacity onPress={() => { setPreset(null); setCustom(''); }}>
              <Text style={styles.link}>Select a ready amount</Text>
            </TouchableOpacity>
          </>
        ) : (
          <AmountGrid options={WITHDRAW_AMOUNTS} value={preset} onSelect={setPreset} />
        )}
      </View>

      <PickerModal
        visible={pickOpen}
        title="Choose account:"
        options={ACCOUNTS.map(a => a.label)}
        value={acc === null ? null : ACCOUNTS[acc].label}
        onSelect={l => { setAcc(ACCOUNTS.findIndex(a => a.label === l)); setPickOpen(false); }}
        onClose={() => setPickOpen(false)}
      />
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  body: { paddingHorizontal: 24 },
  balance: { color: colors.primary, fontSize: 11.5, fontWeight: '700', marginTop: -6, marginBottom: 14 },
  label: { color: colors.textSub, fontSize: 12, marginBottom: 2 },
  link: { color: colors.primary, fontSize: 12, fontWeight: '700', alignSelf: 'flex-end' },
  dock: { paddingHorizontal: 24, paddingTop: 8, paddingBottom: 20, backgroundColor: colors.bg },
});
