import {createContext} from 'react';
import {Period} from '../types';

interface SiteContextData {
  siteId: string;
  period: Period;
  setPeriod: (period: Period) => void;
}

const SiteContext = createContext<SiteContextData>({
  siteId: '',
  period: {period: '30d'},
  setPeriod: () => {},
});

export default SiteContext;
