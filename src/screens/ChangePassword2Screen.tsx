import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenShell } from '../components/layout';
import { TopBar, PrimaryButton } from '../components/ui';
import { SuccessIllustration } from '../components/illustrations';
import { useNavigation } from '../navigation/NavigationContext';
import { colors } from '../theme';

export function ChangePassword2Screen() {
  const { navigate } = useNavigation();
  return (
    <ScreenShell>
      <TopBar title="" variant="white" onBack={() => navigate('changepw1')} />
      <View style={styles.wrap}>
        <SuccessIllustration />
        <Text style={styles.title}>Change password successfully!</Text>
        <Text style={styles.text}>You have successfully change password.{'\n'}Please use the new password when sign in.</Text>
        <PrimaryButton label="Ok" active onPress={() => navigate('signin')} />
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, paddingHorizontal: 28, paddingTop: 30, alignItems: 'center' },
  title: { color: colors.text, fontSize: 18, fontWeight: '800', textAlign: 'center' },
  text: { color: colors.textSub, fontSize: 13, textAlign: 'center', lineHeight: 20, marginVertical: 12 },
});
