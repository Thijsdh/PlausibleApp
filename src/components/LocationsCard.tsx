import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../hooks';
import {fetchBreakdowns} from '../store/dashboard';
import {BreakdownResult} from '../types';
import TabCard from './TabCard';
import Table from './Table';
import countryList from 'country-list';

function CountriesTable() {
  const dispatch = useAppDispatch();
  const {breakdowns} = useAppSelector(selector => selector.dashboard);

  useEffect(() => {
    if (breakdowns['visit:country'] === undefined)
      dispatch(fetchBreakdowns(['visit:country']));
  }, [breakdowns, dispatch]);

  const countries: BreakdownResult[] | undefined = breakdowns[
    'visit:country'
  ]?.map(res => ({
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
