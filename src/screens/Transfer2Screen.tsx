import React from 'react';
import { ScreenShell } from '../components/layout';
import { TopBar } from '../components/ui';
import { TransferForm, transferStore } from '../components/transfer/TransferForm';
import { useNavigation } from '../navigation/NavigationContext';

// Transfer #2 — толтырылған күй → Confirm (transfer3)
export function Transfer2Screen() {
  const { navigate } = useNavigation();
  return (
    <ScreenShell>
      <TopBar title="Transfer" variant="white" onBack={() => navigate('transfer1')} />
      <TransferForm
        initial={transferStore.values}
        submitLabel="Confirm"
        onSubmit={v => { transferStore.values = v; navigate('transfer3'); }}
      />
    </ScreenShell>
  );
}
