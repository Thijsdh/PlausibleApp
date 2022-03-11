import React from 'react';
import {useAppDispatch, useAppSelector} from '../hooks';
import {fetchBreakdowns} from '../store/dashboard';
import {BreakdownResult} from '../types';
import TabCard from './TabCard';
import Table from './Table';

function PageTable({data}: {data: BreakdownResult[]}) {
  return (
    <Table
      headerText={{key: 'Page', value: 'Visitors'}}
      data={data.map(d => ({key: d.property, value: d.visitors}))}
    />
  );
}

export default function PagesCard() {
  const dispatch = useAppDispatch();
  const {breakdowns} = useAppSelector(selector => selector.dashboard);

  return (
    <TabCard
      tabs={[
        {
          title: 'Top Pages',
          headerTitle: 'Top Pages',
          content: <PageTable data={breakdowns['event:page'] || []} />,
          onFocus: () => dispatch(fetchBreakdowns(['event:page'])),
        },
        {
          title: 'Entry Pages',
          headerTitle: 'Entry Pages',
          content: <PageTable data={breakdowns['visit:entry_page'] || []} />,
          onFocus: () => dispatch(fetchBreakdowns(['visit:entry_page'])),
        },
        {
          title: 'Exit Pages',
          headerTitle: 'Exit Pages',
          content: <PageTable data={breakdowns['visit:exit_page'] || []} />,
          onFocus: () => dispatch(fetchBreakdowns(['visit:exit_page'])),
        },
      ]}
    />
  );
}
