const API_KEY = 'AIzaSyCHz3L7gLc1R0qXilz5nDsGbyPwLX46FW8';
const BASE = 'https://identitytoolkit.googleapis.com/v1/accounts';

export const authStore: { token: string | null; email: string; name: string } = {
  token: null, email: '', name: '',
};

const ERRORS: Record<string, string> = {
  EMAIL_EXISTS: 'Бұл email бұрын тіркелген',
  INVALID_EMAIL: 'Email дұрыс емес',
  WEAK_PASSWORD: 'Құпиясөз кемінде 6 таңба болуы керек',
  INVALID_LOGIN_CREDENTIALS: 'Email немесе құпиясөз қате',
  EMAIL_NOT_FOUND: 'Мұндай қолданушы жоқ',
  INVALID_PASSWORD: 'Құпиясөз қате',
  TOO_MANY_ATTEMPTS_TRY_LATER: 'Тым көп әрекет, кейінірек қайталаңыз',
  OPERATION_NOT_ALLOWED: 'Firebase-те Email/Password қосылмаған',
};

async function call(path: string, body: object) {
  let res: Response;
  try {
    res = await fetch(`${BASE}:${path}?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error('Интернет байланысы жоқ');
  }
  const json = await res.json();
  if (!res.ok) {
    const code = String(json?.error?.message ?? '').split(' ')[0];
    throw new Error(ERRORS[code] ?? 'Қате: ' + code);
  }
  return json;
}

// Тіркелу: қолданушы жасайды, содан кейін атын сақтайды
export async function register(name: string, email: string, password: string) {
  const json = await call('signUp', { email, password, returnSecureToken: true });
  await call('update', { idToken: json.idToken, displayName: name, returnSecureToken: false });
  authStore.token = json.idToken;
  authStore.email = email;
  authStore.name = name;
}

// Кіру: email + құпиясөз тексереді
export async function login(email: string, password: string) {
  const json = await call('signInWithPassword', { email, password, returnSecureToken: true });
  authStore.token = json.idToken;
  authStore.email = email;
  authStore.name = json.displayName ?? '';
}