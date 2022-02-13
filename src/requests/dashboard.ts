/**
 * WARNING: This is an undocumented API and should only be used as last resort
 * when the required functionality is not available in the v1 api.
 */

import {LiveStats, Site} from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORAGE_HOST, STORAGE_PLAUSIBLE_KEY} from './login';
import {execApiKeyRegex, execCsrfRegex} from '../util/regexes';

async function get<T = string>(url: string, json = true): Promise<T> {
  const host = await AsyncStorage.getItem(STORAGE_HOST);
  const plausibleKey = await AsyncStorage.getItem(STORAGE_PLAUSIBLE_KEY);

  const res = await fetch(`${host}${url}`, {
    headers: {
      Cookie: `_plausible_key=${plausibleKey}`,
    },
  });

  return (json ? await res.json() : await res.text()) as T;
}

async function post(url: string, data: object): Promise<Response> {
  const host = await AsyncStorage.getItem(STORAGE_HOST);
  const plausibleKey = await AsyncStorage.getItem(STORAGE_PLAUSIBLE_KEY);

  return await fetch(`${host}${url}`, {
    method: 'POST',
    headers: {
      Cookie: `_plausible_key=${plausibleKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

type MainGraphRes = {
  plot?: number[];
  top_stats?: {name: string; value: number}[];
};

export async function getRealtimeAggregate(siteId: string): Promise<LiveStats> {
  const res = await get<MainGraphRes>(
    `/api/stats/${siteId}/main-graph?period=realtime`,
  );

  const getStat = (statName: string) =>
    res.top_stats?.find(({name}) => name.indexOf(statName) !== -1)?.value;

  return {
    statType: 'live_stats',
    current_visitors: getStat('Current visitors'),
    unique_visitors: getStat('Unique visitors'),
    pageviews: getStat('Pageviews'),
  };
}

export async function getRealtimeTimeseries(siteId: string) {
  const res = await get<MainGraphRes>(
    `/api/stats/${siteId}/main-graph?period=realtime`,
  );

  return res.plot?.map((val, index) => ({
    date: `${30 - index} minutes ago`,
    visitors: val,
  }));
}

export async function getSites() {
  const res = await get('/sites', false);

  const sites: Site[] = [];
  const regex = /^<a href="\/(.*)">$/gm;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(res)) !== null) {
    sites.push({
      id: decodeURIComponent(match[1]),
    });
  }

  return sites;
}

export async function getApiKey() {
  const getRes = await get('/settings/api-keys/new', false);

  const keyName = 'Plausible App';
  const csrfToken = execCsrfRegex(getRes);
  const apiKey = execApiKeyRegex(getRes);
  const res = await post('/settings/api-keys', {
    _csrf_token: csrfToken,
    api_key: {
      name: keyName,
      key: apiKey,
    },
  });

  if (res.ok) {
    return apiKey;
  }

  return null;
}
