import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenShell, BottomNav } from '../components/layout';
import { TopBar } from '../components/ui';
import { BeneficiaryRow } from '../components/benef/BeneficiaryRow';
import { BENEFICIARY_GROUPS, benefStore } from '../data/beneficiaries';
import { useNavigation } from '../navigation/NavigationContext';
import { useTabNavigate } from '../navigation/useTabNavigate';
import { colors } from '../theme';

export function BeneficiaryListScreen() {
  const { navigate } = useNavigation();
  const go = useTabNavigate();

  const add = () => {
    benefStore.mode = null;
    benefStore.bank = null;
    benefStore.branch = null;
    benefStore.name = '';
    benefStore.card = '';
    navigate('benefAdd1');
  };

  return (
    <ScreenShell keyboard={<BottomNav active="settings" onChange={go} />}>
      <TopBar title="Beneficiary" variant="white" onBack={() => navigate('transfer1')} />
      <View style={styles.wrap}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }}>
          {BENEFICIARY_GROUPS.map(g => (
            <View key={g.title} style={styles.group}>
              <Text style={styles.groupTitle}>{g.title}</Text>
              <View style={styles.card}>
                {g.items.map(b => (
                  <BeneficiaryRow
                    key={b.id}
                    name={b.name}
                    card={b.card}
                    color={b.color}
                    onPress={() => navigate('benefDetail')}
                  />
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.fab} activeOpacity={0.85} onPress={add}>
          <Ionicons name="add" size={26} color={colors.white} />
        </TouchableOpacity>
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, paddingHorizontal: 24, paddingTop: 12 },
  group: { marginBottom: 16 },
  groupTitle: { color: colors.textSub, fontSize: 10.5, marginBottom: 8 },
  card: { backgroundColor: colors.white, borderRadius: 16, paddingHorizontal: 14, shadowColor: '#2A2350', shadowOpacity: 0.08, shadowRadius: 10, shadowOffset: { width: 0, height: 3 }, elevation: 2 },
  fab: { position: 'absolute', right: 24, bottom: 16, width: 48, height: 48, borderRadius: 999, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', shadowColor: colors.primary, shadowOpacity: 0.35, shadowRadius: 8, elevation: 6 },
});