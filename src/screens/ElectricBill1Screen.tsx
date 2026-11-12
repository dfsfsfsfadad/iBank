import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { ScreenShell } from '../components/layout';
import { TopBar, Field, PrimaryButton, Card } from '../components/ui';
import { electricStore } from '../data/electric';
import { useNavigation } from '../navigation/NavigationContext';
import { colors } from '../theme';

export function ElectricBill1Screen() {
  const { navigate } = useNavigation();
  const [code, setCode] = useState(electricStore.code);
  const active = code.length > 0;

  const check = () => {
    electricStore.code = code;
    navigate('electric2');
  };

  return (
    <ScreenShell>
      <TopBar title="Pay the bill" variant="white" onBack={() => navigate('home')} />
      <Card>
        <Text style={styles.label}>Type electric bill code</Text>
        <Field value={code} onChangeText={setCode} placeholder="Bill code" keyboardType="numeric" />
        <Text style={styles.helper}>Please enter the correct bill code to check information.</Text>
        <PrimaryButton label="Check" active={active} onPress={check} />
      </Card>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  label: { color: colors.textSub, fontSize: 12, marginBottom: 8 },
  helper: { color: colors.textSub, fontSize: 11.5, lineHeight: 17, marginBottom: 14 },
});