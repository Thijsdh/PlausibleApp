import AsyncStorage from '@react-native-async-storage/async-storage';
import {execCsrfRegex, execPlausibleKeyRegex} from '../util/regexes';
import {getApiKey} from './dashboard';

export const STORAGE_PLAUSIBLE_KEY = 'PLAUSIBLE_KEY';
export const STORAGE_API_KEY = 'API_KEY';
export const STORAGE_HOST = 'HOST';

async function getCsrfToken(host?: string) {
  if (!host) {
    host = (await AsyncStorage.getItem(STORAGE_HOST)) || '';
  }
  const res = await fetch(`${host}/login`);

  if (res.status !== 200) {
    return null;
  }

  return execCsrfRegex(await res.text());
}

export async function login(host: string, email: string, password: string) {
  if (await isLoggedIn(host)) {
    return true;
  }

  const csrfToken = await getCsrfToken(host);
  if (!csrfToken) {
    return false;
  }

  const res = await fetch(`${host}/login`, {
    method: 'POST',
    body: JSON.stringify({
      _csrf_token: csrfToken,
      email,
      password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const cookies = res.headers.get('set-cookie');
  const plausibleKey = execPlausibleKeyRegex(cookies);
  if (!plausibleKey) {
    return false;
  }

  await AsyncStorage.multiSet([
    [STORAGE_HOST, host],
    [STORAGE_PLAUSIBLE_KEY, plausibleKey],
  ]);

  const apiKey = await getApiKey();
  if (!apiKey) {
    await AsyncStorage.multiRemove([STORAGE_HOST, STORAGE_PLAUSIBLE_KEY]);
    return false;
  }

  await AsyncStorage.setItem(STORAGE_API_KEY, apiKey);

  return true;
}

export async function isLoggedIn(host?: string | null) {
  if (!host) {
    host = await AsyncStorage.getItem(STORAGE_HOST);
  }
  const plausibleKey = await AsyncStorage.getItem(STORAGE_PLAUSIBLE_KEY);
  if (!host || !plausibleKey) {
    return false;
  }

  const res = await fetch(`${host}/login`, {
    headers: {
      Cookie: `_plausible_key=${plausibleKey}`,
    },
  });

  return res.url.endsWith('/sites');
}
