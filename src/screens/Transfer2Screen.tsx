import React from 'react';
import { Alert } from 'react-native';
import { ScreenShell } from '../components/layout';
import { TopBar } from '../components/ui';
import { TransferForm, FILLED_TRANSFER, transferStore } from '../components/transfer/TransferForm';
import { useNavigation } from '../navigation/NavigationContext';

// Transfer #2 — толтырылған күй (Confirm)
export function Transfer2Screen() {
  const { navigate } = useNavigation();
  return (
    <ScreenShell>
      <TopBar title="Transfer" variant="white" onBack={() => navigate('transfer1')} />
      <TransferForm
        initial={transferStore.values}
        submitLabel="Confirm"
        onSubmit={v =>
          Alert.alert('Transfer successful', `$${v.amount} → ${v.name}`, [{
            text: 'OK',
            onPress: () => { transferStore.values = FILLED_TRANSFER; navigate('home'); },
          }])
        }
      />
    </ScreenShell>
  );
}
