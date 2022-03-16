import React from 'react';
import {useAppDispatch, useAppSelector} from '../hooks';
import {fetchBreakdowns} from '../store/dashboard';
import {BreakdownResult} from '../types';
import TabCard from './TabCard';
import Table from './Table';
import countryList from 'country-list';

function CountriesTable({data}: {data: BreakdownResult[]}) {
  return (
    <Table
      headerText={{key: 'Country', value: 'Visitors'}}
      data={data.map(d => ({key: d.property, value: d.visitors}))}
    />
  );
}

function getCountryFlag(country: string) {
  const codePoints = country.split('').map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export default function CountriesCard() {
  const dispatch = useAppDispatch();
  const {breakdowns} = useAppSelector(selector => selector.dashboard);

  const countries: BreakdownResult[] | undefined = breakdowns[
    'visit:country'
  ]?.map(res => ({
    ...res,
    property: `${getCountryFlag(res.property)} ${
      countryList.getName(res.property) || res.property
    }`,
  }));

  return (
    <TabCard
      tabs={[
        {
          title: 'Countries',
          headerTitle: 'Countries',
          content: <CountriesTable data={countries || []} />,
          onFocus: () => dispatch(fetchBreakdowns(['visit:country'])),
        },
      ]}
    />
  );
}
