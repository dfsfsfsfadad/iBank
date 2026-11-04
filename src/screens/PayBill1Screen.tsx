import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { ScreenShell } from '../components/layout';
import { TopBar, Field, PrimaryButton, Card, Dropdown } from '../components/ui';
import { COMPANIES, billStore } from '../data/bill';
import { useNavigation } from '../navigation/NavigationContext';
import { colors } from '../theme';

export function PayBill1Screen() {
  const { navigate } = useNavigation();
  const [company, setCompany] = useState<string | null>(billStore.company);
  const [code, setCode] = useState(billStore.code);
  const active = !!company && code.length > 0;

  const check = () => {
    billStore.company = company;
    billStore.code = code;
    navigate('paybill2');
  };

  return (
    <ScreenShell>
      <TopBar title="Pay the bill" variant="white" onBack={() => navigate('home')} />
      <Card>
        <Dropdown value={company} placeholder="Choose company" options={COMPANIES} onSelect={setCompany} />
        <Text style={styles.label}>Type internet bill code</Text>
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
