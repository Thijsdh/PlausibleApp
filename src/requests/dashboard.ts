import {execApiKeyRegex, execCsrfRegex} from '../util/regexes';
import {dashboardFetcher} from './base';

export async function getApiKey() {
  const getRes = await dashboardFetcher('/settings/api-keys/new', false);

  const keyName = 'Plausible App';
  const csrfToken = execCsrfRegex(getRes);
  const apiKey = execApiKeyRegex(getRes);
  const body = {
    _csrf_token: csrfToken,
    api_key: {
      name: keyName,
      key: apiKey,
    },
  };

  try {
    await dashboardFetcher('/settings/api-keys', false, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return apiKey;
  } catch (e) {
    console.error(e);
    return null;
  }
}
