import React, { useState } from 'react';
import { ScreenShell } from '../components/layout';
import { TopBar } from '../components/ui';
import { ExchangeForm } from '../components/exchange/ExchangeForm';
import { exchangeStore } from '../data/exchange';
import { useNavigation } from '../navigation/NavigationContext';

export function Exchange1Screen() {
  const { navigate } = useNavigation();
  const [amount, setAmount] = useState(() => {
    exchangeStore.amount = '';
    return '';
  });

  const change = (t: string) => {
    exchangeStore.amount = t;
    setAmount(t);
  };

  return (
    <ScreenShell>
      <TopBar title="Exchange" variant="white" onBack={() => navigate('search')} />
      <ExchangeForm
        amount={amount}
        onAmountChange={change}
        onOpenCurrency={() => navigate('exchange2Modal')}
        onSubmit={() => navigate('exchange2')}
      />
    </ScreenShell>
  );
}
