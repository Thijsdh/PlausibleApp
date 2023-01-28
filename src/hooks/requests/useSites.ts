import useSWRImmutable from 'swr/immutable';
import {dashboardFetcher} from '../../requests/base';
import {Site} from '../../types';

async function fetcher(url: string) {
  const res = await dashboardFetcher(url, false);
  const sites: Site[] = [];
  const regex = /^<a href="\/(.*)">$/gm;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(res)) !== null) {
    const id = decodeURIComponent(match[1]);
    sites.push({
      id,
      faviconUrl: `https://icons.duckduckgo.com/ip3/${id}.ico`,
    });
  }
  return sites;
}

function useSites() {
  const {data, error, isLoading} = useSWRImmutable('/sites', fetcher);

  return {
    sites: data,
    isLoading,
    error,
  };
}

export default useSites;
