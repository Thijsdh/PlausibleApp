import React, {useState} from 'react';
import {useAppSelector} from '../hooks';
import {BreakdownResult} from '../types';
import TabCard from './TabCard';
import Table from './Table';

type Props = {};

function PageTable({data}: {data: BreakdownResult[]}) {
  return (
    <Table
      headerText={{key: 'Page', value: 'Visitors'}}
      data={data.map(d => ({key: d.property, value: d.visitors}))}
    />
  );
}

export default function PagesCard({}: Props) {
  const {topPagesBreakdown, entryPagesBreakdown, exitPagesBreakdown} =
    useAppSelector(selector => selector.dashboard);

  const [tabIndex, setTabIndex] = useState(0);

  return (
    <TabCard
      tabIndex={tabIndex}
      setTabIndex={setTabIndex}
      tabs={[
        {
          title: 'Top Pages',
          headerTitle: 'Top Pages',
          content: <PageTable data={topPagesBreakdown || []} />,
        },
        {
          title: 'Entry Pages',
          headerTitle: 'Entry Pages',
          content: <PageTable data={entryPagesBreakdown || []} />,
        },
        {
          title: 'Exit Pages',
          headerTitle: 'Exit Pages',
          content: <PageTable data={exitPagesBreakdown || []} />,
        },
      ]}
    />
  );
}
