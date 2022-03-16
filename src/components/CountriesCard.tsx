import React from 'react';
import {useAppDispatch, useAppSelector} from '../hooks';
import {fetchBreakdowns} from '../store/dashboard';
import {BreakdownResult} from '../types';
import TabCard from './TabCard';
import Table from './Table';

function CountriesTable({data}: {data: BreakdownResult[]}) {
  return (
    <Table
      headerText={{key: 'Country', value: 'Visitors'}}
      data={data.map(d => ({key: d.property, value: d.visitors}))}
    />
  );
}

export default function CountriesCard() {
  const dispatch = useAppDispatch();
  const {breakdowns} = useAppSelector(selector => selector.dashboard);

  return (
    <TabCard
      tabs={[
        {
          title: 'Countries',
          headerTitle: 'Countries',
          content: <CountriesTable data={breakdowns['visit:country'] || []} />,
          onFocus: () => dispatch(fetchBreakdowns(['visit:country'])),
        },
      ]}
    />
  );
}
