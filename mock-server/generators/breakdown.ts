import {Property} from '../../src/types';

const values: Partial<Record<Property, Record<string, number>>> = {
  'visit:country': {
    US: 250,
    DE: 152,
    GB: 110,
    NL: 64,
    AU: 55,
    FR: 55,
    IN: 52,
    ES: 50,
    CA: 40,
  },
  'event:page': {
    '/a': 1023,
    '/b': 834,
    '/c': 512,
    '/d': 222,
    '/e': 100,
  },
  'visit:entry_page': {
    '/a': 768,
    '/b': 659,
    '/c': 540,
    '/d': 81,
    '/e': 30,
  },
  'visit:exit_page': {
    '/a': 798,
    '/b': 645,
    '/c': 520,
    '/d': 210,
    '/e': 13,
  },
  'visit:source': {
    'Direct / None': 1239,
    Google: 140,
    GitHub: 26,
    DuckDuckGo: 9,
    Twitter: 8,
    Bing: 7,
    acumbamail: 5,
    'odoo.com': 3,
    Reddit: 3,
  },
  'visit:utm_medium': {
    'Direct / None': 1500,
    email: 6,
    social: 4,
    cpc: 1,
  },
  'visit:utm_source': {
    'Direct / None': 1500,
    acumbamail: 5,
    LinkedIn: 2,
    Twitter: 2,
  },
  'visit:utm_campaign': {
    'Direct / None': 1500,
  },
  'visit:os': {
    Windows: 1000,
    Mac: 500,
    iOS: 100,
    Android: 100,
    'GNU/Linux': 50,
  },
  'visit:browser': {
    Chrome: 1000,
    Firefox: 500,
    Safari: 100,
    'Microsoft Edge': 100,
    Opera: 50,
  },
};

export interface BreakdownParams {
  property: Property;
}

export default function generateBreakdown({property}: BreakdownParams) {
  const key = property.startsWith('visit:') ? property.substring(6) : 'page';
  const results = Object.entries(values[property] ?? {}).map(
    ([prop, visitors]) => ({
      [key]: prop,
      visitors,
    }),
  );
  return {results};
}
