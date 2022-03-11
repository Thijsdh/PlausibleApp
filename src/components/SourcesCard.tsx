import React from 'react';
import {useAppDispatch, useAppSelector} from '../hooks';
import {fetchBreakdowns} from '../store/dashboard';
import {BreakdownResult} from '../types';
import TabCard from './TabCard';
import Table from './Table';

function SourcesTable({data}: {data: BreakdownResult[]}) {
  return (
    <Table
      headerText={{key: 'Source', value: 'Visitors'}}
      data={data.map(d => ({key: d.property, value: d.visitors}))}
    />
  );
}

export default function SourcesCard() {
  const dispatch = useAppDispatch();
  const {breakdowns} = useAppSelector(selector => selector.dashboard);

  return (
    <TabCard
      title="Top Sources"
      tabs={[
        {
          title: 'All',
          content: <SourcesTable data={breakdowns['visit:source'] || []} />,
          onFocus: () => dispatch(fetchBreakdowns(['visit:source'])),
        },
        {
          title: 'Medium',
          content: <SourcesTable data={breakdowns['visit:utm_medium'] || []} />,
          onFocus: () => dispatch(fetchBreakdowns(['visit:utm_medium'])),
        },
        {
          title: 'Source',
          content: <SourcesTable data={breakdowns['visit:utm_source'] || []} />,
          onFocus: () => dispatch(fetchBreakdowns(['visit:utm_source'])),
        },
        {
          title: 'Campaign',
          content: (
            <SourcesTable data={breakdowns['visit:utm_campaign'] || []} />
          ),
          onFocus: () => dispatch(fetchBreakdowns(['visit:utm_campaign'])),
        },
      ]}
    />
  );
}
