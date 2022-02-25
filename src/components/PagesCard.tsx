import React from 'react';
import {PageBreakdownResult} from '../types';
import TabCard from './TabCard';
import Table from './Table';

type Props = {};

function PageTable({data}: {data: PageBreakdownResult[]}) {
  return (
    <Table
      headerText={{key: 'Page', value: 'Visitors'}}
      data={data.map(d => ({key: d.page, value: d.visitors}))}
    />
  );
}

export default function PagesCard({}: Props) {
  const data: PageBreakdownResult[] = [
    {page: '/', visitors: 10},
    {page: '/1', visitors: 7},
    {page: '/2', visitors: 5},
    {page: '/3', visitors: 4},
    {page: '/4', visitors: 4},
  ];

  return (
    <TabCard
      tabs={[
        {
          title: 'Top Pages',
          headerTitle: 'Top Pages',
          content: <PageTable data={data} />,
        },
        {title: 'Entry Pages', headerTitle: 'Entry Pages', content: <></>},
        {title: 'Exit Pages', headerTitle: 'Exit Pages', content: <></>},
      ]}
    />
  );
}
