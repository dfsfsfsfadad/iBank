import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenShell } from '../components/layout';
import { TopBar, Card, ReadField, PrimaryButton } from '../components/ui';
import { benefStore } from '../data/beneficiaries';
import { useNavigation } from '../navigation/NavigationContext';
import { colors } from '../theme';

export function BeneficiaryAdd2Screen() {
  const { navigate } = useNavigation();
  const needsBank = benefStore.mode === 'bank';

  return (
    <ScreenShell
      keyboard={
        <View style={styles.dock}>
          <PrimaryButton label="Save to directory" onPress={() => navigate('benefDetail')} />
        </View>
      }
    >
      <TopBar title="Add new" variant="white" onBack={() => navigate('benefAdd1')} />
      <View style={styles.avatarWrap}>
        <View style={styles.avatar}><Text style={styles.initials}>{benefStore.name.slice(0, 1).toUpperCase()}</Text></View>
        <Text style={styles.name}>{benefStore.name}</Text>
      </View>
      <Card>
        {needsBank && (
          <>
            <ReadField label="Choose bank" value={benefStore.bank ?? ''} />
            <ReadField label="Choose branch" value={benefStore.branch ?? ''} />
          </>
        )}
        <ReadField label="Transaction name" value={benefStore.name} />
        <ReadField label="Card number" value={benefStore.card} />
      </Card>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  avatarWrap: { alignItems: 'center', marginTop: 8 },
  avatar: { width: 92, height: 92, borderRadius: 999, backgroundColor: colors.lavender, alignItems: 'center', justifyContent: 'center' },
  initials: { color: colors.primary, fontSize: 28, fontWeight: '800' },
  name: { color: colors.primary, fontSize: 12, fontWeight: '700', marginTop: 8 },
  dock: { paddingHorizontal: 24, paddingTop: 8, paddingBottom: 20, backgroundColor: colors.bg },
});