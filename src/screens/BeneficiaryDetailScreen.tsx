import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { ScreenShell } from '../components/layout';
import { TopBar, Card, ReadField, PrimaryButton } from '../components/ui';
import { benefStore } from '../data/beneficiaries';
import { useNavigation } from '../navigation/NavigationContext';
import { colors } from '../theme';

export function BeneficiaryDetailScreen() {
  const { navigate } = useNavigation();
  const needsBank = benefStore.mode === 'bank';

  return (
    <ScreenShell purple>
      <TopBar title="Beneficiary" onBack={() => navigate('benefList')} />
      <View style={styles.hero}>
        <View style={styles.avatar}><Text style={styles.initials}>{benefStore.name.slice(0, 1).toUpperCase()}</Text></View>
        <Text style={styles.name}>{benefStore.name}</Text>
      </View>
      <ScrollView style={styles.sheet} contentContainerStyle={{ paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        <Card>
          {needsBank && (
            <>
              <ReadField label="Choose bank" value={benefStore.bank ?? ''} />
              <ReadField label="Choose branch" value={benefStore.branch ?? ''} />
            </>
          )}
          <ReadField label="Transaction name" value={benefStore.name} />
          <ReadField label="Card number" value={benefStore.card} />
          <PrimaryButton label="Confirm" onPress={() => navigate('benefList')} />
        </Card>
      </ScrollView>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: 'center', paddingTop: 6, paddingBottom: 18 },
  avatar: { width: 92, height: 92, borderRadius: 999, backgroundColor: colors.white, borderWidth: 3, borderColor: 'rgba(255,255,255,0.5)', alignItems: 'center', justifyContent: 'center' },
  initials: { color: colors.primary, fontSize: 28, fontWeight: '800' },
  name: { color: colors.white, fontSize: 12, fontWeight: '700', marginTop: 8 },
  sheet: { flex: 1, backgroundColor: colors.bg, borderTopLeftRadius: 28, borderTopRightRadius: 28 },
});