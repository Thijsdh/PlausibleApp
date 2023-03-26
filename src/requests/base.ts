import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORAGE_API_KEY, STORAGE_HOST, STORAGE_PLAUSIBLE_KEY} from './login';

/**
 * Fetches data from the Plausible API
 * @param url URL to fetch
 * @returns JSON response
 */
export async function fetcher<T>(url: string): Promise<T> {
  const host = await AsyncStorage.getItem(STORAGE_HOST);
  const accessToken = await AsyncStorage.getItem(STORAGE_API_KEY);

  const res = await fetch(`${host}${url}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await res.json();
  return data as T;
}

/**
 * Fetches data from the undocumented Plausible dashboard API
 * @param url URL to fetch
 * @param json Whether to parse the response as JSON
 * @returns Response
 */
export async function dashboardFetcher<T = string>(
  url: string,
  json = true,
  init?: RequestInit,
): Promise<T> {
  const host = await AsyncStorage.getItem(STORAGE_HOST);
  const plausibleKey = await AsyncStorage.getItem(STORAGE_PLAUSIBLE_KEY);

  const res = await fetch(`${host}${url}`, {
    ...init,
    headers: {
      ...init?.headers,
      Cookie: `_plausible_key=${plausibleKey}`,
    },
  });

  if (!res.ok) {
    throw new Error(
      `Response is not ok: ${init?.method || 'GET'} ${url}: ${res.status}`,
    );
  }

  return (json ? await res.json() : await res.text()) as T;
}
