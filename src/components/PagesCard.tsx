import React from 'react';
import useBreakdown from '../hooks/requests/useBreakdown';
import {Period, Property} from '../types';
import TabCard from './TabCard';
import Table from './Table';

function PageTable({
  prop,
  siteId,
  period,
}: {
  prop: Property;
  siteId: string;
  period: Period;
}) {
  const {breakdown} = useBreakdown({siteId, property: prop, period});

  return (
    <Table
      headerText={{key: 'Page', value: 'Visitors'}}
      data={breakdown?.map(d => ({key: d.property, value: d.visitors})) || []}
    />
  );
}

export default function PagesCard({
  siteId,
  period,
}: {
  siteId: string;
  period: Period;
}) {
  return (
    <TabCard
      tabs={[
        {
          title: 'Top Pages',
          headerTitle: 'Top Pages',
          content: (
            <PageTable prop="event:page" siteId={siteId} period={period} />
          ),
        },
        {
          title: 'Entry Pages',
          headerTitle: 'Entry Pages',
          content: (
            <PageTable
              prop="visit:entry_page"
              siteId={siteId}
              period={period}
            />
          ),
        },
        {
          title: 'Exit Pages',
          headerTitle: 'Exit Pages',
          content: (
            <PageTable prop="visit:exit_page" siteId={siteId} period={period} />
          ),
        },
      ]}
    />
  );
}
