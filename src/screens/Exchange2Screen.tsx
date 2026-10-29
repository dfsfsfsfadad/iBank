import React, { useState } from 'react';
import { Alert } from 'react-native';
import { ScreenShell } from '../components/layout';
import { TopBar } from '../components/ui';
import { ExchangeForm } from '../components/exchange/ExchangeForm';
import { exchangeStore } from '../data/exchange';
import { useNavigation } from '../navigation/NavigationContext';

// Exchange #2 — толтырылған күй
export function Exchange2Screen() {
  const { navigate } = useNavigation();
  const [amount, setAmount] = useState(exchangeStore.amount || '1000');

  const change = (t: string) => {
    exchangeStore.amount = t;
    setAmount(t);
  };

  const submit = () =>
    Alert.alert('Exchange successful', `${amount}`, [{ text: 'OK', onPress: () => navigate('home') }]);

  return (
    <ScreenShell>
      <TopBar title="Exchange" variant="white" onBack={() => navigate('exchange1')} />
      <ExchangeForm
        amount={amount}
        onAmountChange={change}
        onOpenCurrency={() => navigate('exchange2Modal')}
        onSubmit={submit}
      />
    </ScreenShell>
  );
}
