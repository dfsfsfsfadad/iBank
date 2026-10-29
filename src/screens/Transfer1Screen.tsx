import React from 'react';
import { ScreenShell } from '../components/layout';
import { TopBar } from '../components/ui';
import { TransferForm, EMPTY_TRANSFER, transferStore } from '../components/transfer/TransferForm';
import { useNavigation } from '../navigation/NavigationContext';

// Transfer #1 — бос күй
export function Transfer1Screen() {
  const { navigate } = useNavigation();
  return (
    <ScreenShell>
      <TopBar title="Transfer" variant="white" onBack={() => navigate('home')} />
      <TransferForm
        initial={EMPTY_TRANSFER}
        submitLabel="Transfer"
        onSubmit={v => { transferStore.values = v; navigate('transfer2'); }}
      />
    </ScreenShell>
  );
}
