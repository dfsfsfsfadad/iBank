import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenShell } from '../components/layout';
import { TopBar, Field, PickField, PickerModal, PrimaryButton, Card } from '../components/ui';
import { BANKS, BRANCHES } from '../data/banks';
import { benefStore } from '../data/beneficiaries';
import { useNavigation } from '../navigation/NavigationContext';
import { colors, radius } from '../theme';

type Mode = 'card' | 'same' | 'bank';

const MODES: { id: Mode; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { id: 'card', label: 'Transfer via card number', icon: 'card-outline' },
  { id: 'same', label: 'Transfer to the same bank', icon: 'person-outline' },
  { id: 'bank', label: 'Transfer to another bank', icon: 'business-outline' },
];

export function BeneficiaryAdd1Screen() {
  const { navigate } = useNavigation();
  const [mode, setMode] = useState<Mode>(benefStore.mode ?? 'bank');
  const [bank, setBank] = useState<string | null>(benefStore.bank);
  const [branch, setBranch] = useState<string | null>(benefStore.branch);
  const [name, setName] = useState(benefStore.name);
  const [card, setCard] = useState(benefStore.card);
  const [picker, setPicker] = useState<'bank' | 'branch' | null>(null);

  const needsBank = mode === 'bank';
  const active = name.length > 0 && card.length > 0 && (!needsBank || (!!bank && !!branch));

  const save = () => {
    benefStore.mode = mode;
    benefStore.bank = bank;
    benefStore.branch = branch;
    benefStore.name = name;
    benefStore.card = card;
    navigate('benefAdd2');
  };

  return (
    <ScreenShell
      keyboard={
        <View style={styles.dock}>
          <PrimaryButton label="Save to directory" active={active} onPress={save} />
        </View>
      }
    >
      <TopBar title="Add new" variant="white" onBack={() => navigate('benefList')} />
      <View style={styles.avatarWrap}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={44} color={colors.textMute} />
          <View style={styles.plus}><Ionicons name="add" size={14} color={colors.white} /></View>
        </View>
        <Text style={styles.nameTop}>{name || 'New beneficiary'}</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabs}>
        {MODES.map(m => {
          const on = mode === m.id;
          return (
            <TouchableOpacity key={m.id} style={[styles.tab, on && styles.tabOn]} activeOpacity={0.8} onPress={() => setMode(m.id)}>
              <Ionicons name={m.icon} size={18} color={on ? colors.white : colors.textSub} />
              <Text style={[styles.tabText, on && styles.tabTextOn]}>{m.label}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <Card>
        {needsBank && (
          <>
            <PickField label="Choose bank" value={bank} placeholder="Choose bank" onPress={() => setPicker('bank')} />
            <PickField label="Choose branch" value={branch} placeholder="Choose branch" onPress={() => setPicker('branch')} />
          </>
        )}
        <Field label={needsBank ? 'Transaction name' : undefined} value={name} onChangeText={setName} placeholder="Transaction name" />
        <Field label={needsBank ? 'Card number' : undefined} value={card} onChangeText={setCard} placeholder="Card number" keyboardType="numeric" />
      </Card>

      <PickerModal
        visible={picker === 'bank'}
        title="Choose beneficiary bank"
        options={BANKS}
        value={bank}
        searchable
        onSelect={b => { setBank(b); setPicker(null); }}
        onClose={() => setPicker(null)}
      />
      <PickerModal
        visible={picker === 'branch'}
        title="Choose branch"
        options={BRANCHES}
        value={branch}
        onSelect={b => { setBranch(b); setPicker(null); }}
        onClose={() => setPicker(null)}
      />
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  avatarWrap: { alignItems: 'center', marginTop: 8 },
  avatar: { width: 92, height: 92, borderRadius: 999, backgroundColor: colors.bgMuted, alignItems: 'center', justifyContent: 'center' },
  plus: { position: 'absolute', right: 0, bottom: 2, width: 26, height: 26, borderRadius: 999, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: colors.white },
  nameTop: { color: colors.primary, fontSize: 12, fontWeight: '700', marginTop: 8 },
  tabs: { paddingHorizontal: 24, gap: 10, marginTop: 18 },
  tab: { width: 120, height: 78, borderRadius: radius.card, backgroundColor: '#EDEEF6', padding: 12, justifyContent: 'space-between' },
  tabOn: { backgroundColor: colors.orange },
  tabText: { color: colors.textSub, fontSize: 10, lineHeight: 13 },
  tabTextOn: { color: colors.white, fontWeight: '700' },
  dock: { paddingHorizontal: 24, paddingTop: 8, paddingBottom: 20, backgroundColor: colors.bg },
});