import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenShell } from '../components/layout';
import { TopBar } from '../components/ui';
import { ExchangeForm } from '../components/exchange/ExchangeForm';
import { CURRENCIES, exchangeStore } from '../data/exchange';
import { useNavigation } from '../navigation/NavigationContext';
import { colors } from '../theme';

// Exchange #2 (Select the currency) — валюта таңдау терезесі
export function Exchange2ModalScreen() {
  const { navigate } = useNavigation();
  const sel = exchangeStore.currencyIdx;
  const close = () => navigate('exchange2');

  return (
    <View style={{ flex: 1 }}>
      <ScreenShell>
        <TopBar title="Exchange" variant="white" onBack={close} />
        <ExchangeForm
          amount={exchangeStore.amount || '1000'}
          onAmountChange={() => {}}
          onOpenCurrency={() => {}}
          onSubmit={() => {}}
        />
      </ScreenShell>

      <View style={styles.overlay}>
        <View style={styles.modal}>
          <TouchableOpacity style={styles.close} onPress={close} hitSlop={8}>
            <Ionicons name="close" size={18} color={colors.textSub} />
          </TouchableOpacity>
          <Text style={styles.title}>Select the currency</Text>
          {CURRENCIES.map((c, i) => (
            <TouchableOpacity
              key={c.code}
              style={styles.opt}
              onPress={() => { exchangeStore.currencyIdx = i; close(); }}
            >
              <Text style={[styles.optText, i === sel && styles.optOn]}>{c.code} ( {c.name} )</Text>
              {i === sel && <Ionicons name="checkmark" size={16} color={colors.primary} />}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
overlay: {
  position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 28,
},  modal: { width: '100%', backgroundColor: colors.white, borderRadius: 16, paddingVertical: 20, paddingHorizontal: 22 },
  close: { position: 'absolute', top: 12, right: 12 },
  title: { color: colors.text, fontSize: 14, fontWeight: '700', textAlign: 'center', marginBottom: 14 },
  opt: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 11 },
  optText: { color: colors.textSub, fontSize: 13 },
  optOn: { color: colors.primary, fontWeight: '700' },
});
