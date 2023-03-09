import React, {useContext} from 'react';
import {BreakdownResult} from '../types';
import TabCard from './TabCard';
import Table from './Table';
import countryList from 'country-list';
import useBreakdown from '../hooks/requests/useBreakdown';
import SiteContext from '../contexts/SiteContext';

function CountriesTable() {
  const {siteId, period} = useContext(SiteContext);
  const {breakdown} = useBreakdown({siteId, property: 'visit:country', period});

  const countries: BreakdownResult[] | undefined = breakdown?.map(res => ({
    ...res,
    property: `${getCountryFlag(res.property)} ${
      countryList.getName(res.property) || res.property
    }`,
  }));

  return (
    <Table
      headerText={{key: 'Country', value: 'Visitors'}}
      data={countries?.map(d => ({key: d.property, value: d.visitors})) || []}
    />
  );
}

function getCountryFlag(country: string) {
  const codePoints = country.split('').map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export default function LocationsCard() {
  return (
    <TabCard
      tabs={[
        {
          title: 'Countries',
          headerTitle: 'Countries',
          content: <CountriesTable />,
        },
      ]}
    />
  );
}
