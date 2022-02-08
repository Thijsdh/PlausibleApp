import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORAGE_API_KEY, STORAGE_HOST} from './login';

export async function get<T>(url: string): Promise<T> {
  const host = await AsyncStorage.getItem(STORAGE_HOST);
  const accessToken = await AsyncStorage.getItem(STORAGE_API_KEY);

  const res = await fetch(`${host}${url}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return (await res.json()) as T;
}
