import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenShell } from '../components/layout';
import { TopBar, Field, PrimaryButton, PickField, PickerModal, AmountGrid } from '../components/ui';
import { ACCOUNTS } from '../components/transfer/TransferForm';
import { MOBILE_AMOUNTS, MOBILE_BENEFICIARIES, mobileStore } from '../data/mobile';
import { useNavigation } from '../navigation/NavigationContext';
import { colors } from '../theme';

// Mobile prepaid (Recharge the phone)
export function Mobile1Screen() {
  const { navigate } = useNavigation();
  const [acc, setAcc] = useState<number | null>(null);
  const [pickOpen, setPickOpen] = useState(false);
  const [benef, setBenef] = useState<string | null>(null);
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState<string | null>(null);
  const active = acc !== null && phone.length > 0 && !!amount;

  const pickBenef = (id: string) => {
    const b = MOBILE_BENEFICIARIES.find(x => x.id === id);
    if (b) { setBenef(id); setPhone(b.phone); }
  };

  const next = () => {
    mobileStore.acc = acc;
    mobileStore.phone = phone;
    mobileStore.amount = amount ?? '';
    navigate('mobile2');
  };

  return (
    <ScreenShell
      keyboard={
        <View style={styles.dock}>
          <PrimaryButton label="Confirm" active={active} onPress={next} />
        </View>
      }
    >
      <TopBar title="Mobile prepaid" variant="white" onBack={() => navigate('home')} />
      <View style={styles.body}>
        <PickField
          label="Choose account/ card"
          value={acc === null ? null : ACCOUNTS[acc].label}
          placeholder="Choose account/ card"
          onPress={() => setPickOpen(true)}
        />
        {acc !== null && <Text style={styles.balance}>Available balance: {ACCOUNTS[acc].balance}</Text>}

        <View style={styles.head}>
          <Text style={styles.label}>Directory</Text>
          <TouchableOpacity><Text style={styles.find}>Find beneficiary</Text></TouchableOpacity>
        </View>
        <View style={styles.benefRow}>
          <TouchableOpacity style={styles.add} activeOpacity={0.8}>
            <Ionicons name="add" size={26} color={colors.textMute} />
          </TouchableOpacity>
          {MOBILE_BENEFICIARIES.map(b => {
            const on = benef === b.id;
            return (
              <TouchableOpacity key={b.id} style={[styles.benef, on && styles.benefOn]} onPress={() => pickBenef(b.id)} activeOpacity={0.8}>
                <View style={[styles.avatar, { backgroundColor: on ? 'rgba(255,255,255,0.25)' : b.color + '33' }]}>
                  <Ionicons name="person" size={22} color={on ? colors.white : b.color} />
                </View>
                <Text style={[styles.benefName, on && { color: colors.white }]}>{b.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Field label="Phone number" value={phone} onChangeText={setPhone} placeholder="Phone number" keyboardType="phone-pad" />

        <Text style={styles.label}>Choose amount</Text>
        <AmountGrid options={MOBILE_AMOUNTS} value={amount} onSelect={setAmount} />
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
  body: { paddingHorizontal: 24, paddingTop: 14 },
  balance: { color: colors.primary, fontSize: 11.5, fontWeight: '700', marginTop: -6 },
  head: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 18 },
  label: { color: colors.textSub, fontSize: 12 },
  find: { color: colors.primary, fontSize: 12, fontWeight: '700' },
  benefRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 10, marginBottom: 18 },
  add: { width: 60, height: 70, borderRadius: 16, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', shadowColor: '#2A2350', shadowOpacity: 0.08, shadowRadius: 8, elevation: 2 },
  benef: { width: 70, height: 70, borderRadius: 16, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', gap: 4, borderWidth: 1.5, borderColor: 'transparent', shadowColor: '#2A2350', shadowOpacity: 0.08, shadowRadius: 8, elevation: 2 },
  benefOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  avatar: { width: 36, height: 36, borderRadius: 999, alignItems: 'center', justifyContent: 'center' },
  benefName: { color: colors.text, fontSize: 10.5 },
  dock: { paddingHorizontal: 24, paddingTop: 8, paddingBottom: 20, backgroundColor: colors.bg },
});
