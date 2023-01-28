import React from 'react';
import useBreakdown from '../hooks/requests/useBreakdown';
import {Period, Property} from '../types';
import TabCard from './TabCard';
import Table from './Table';

function SourcesTable({
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
      headerText={{key: 'Source', value: 'Visitors'}}
      data={breakdown?.map(d => ({key: d.property, value: d.visitors})) || []}
    />
  );
}

export default function SourcesCard({
  siteId,
  period,
}: {
  siteId: string;
  period: Period;
}) {
  return (
    <TabCard
      title="Top Sources"
      tabs={[
        {
          title: 'All',
          content: (
            <SourcesTable prop="visit:source" siteId={siteId} period={period} />
          ),
        },
        {
          title: 'Medium',
          content: (
            <SourcesTable
              prop="visit:utm_medium"
              siteId={siteId}
              period={period}
            />
          ),
        },
        {
          title: 'Source',
          content: (
            <SourcesTable
              prop="visit:utm_source"
              siteId={siteId}
              period={period}
            />
          ),
        },
        {
          title: 'Campaign',
          content: (
            <SourcesTable
              prop="visit:utm_campaign"
              siteId={siteId}
              period={period}
            />
          ),
        },
      ]}
    />
  );
}
