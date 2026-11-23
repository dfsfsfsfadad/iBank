import * as LocalAuthentication from 'expo-local-authentication';

// Құрылғыда саусақ ізі бар және қосулы ма
export async function isTouchIdAvailable(): Promise<boolean> {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  if (!hasHardware) return false;
  return LocalAuthentication.isEnrolledAsync();
}

// Нақты Touch ID / саусақ ізі терезесін ашады
export async function authenticateTouchId(promptMessage: string): Promise<{ ok: boolean; error?: string }> {
  const res = await LocalAuthentication.authenticateAsync({
    promptMessage,
    cancelLabel: 'Cancel',
    disableDeviceFallback: true, // PIN/пароль емес, тек саусақ ізі
  });
  return res.success ? { ok: true } : { ok: false, error: res.error };
}