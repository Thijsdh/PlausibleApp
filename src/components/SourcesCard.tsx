import React, {useContext} from 'react';
import SiteContext from '../contexts/SiteContext';
import useBreakdown from '../hooks/requests/useBreakdown';
import {Property} from '../types';
import TabCard from './TabCard';
import Table from './Table';

function SourcesTable({prop}: {prop: Property}) {
  const {siteId, period} = useContext(SiteContext);
  const {breakdown} = useBreakdown({siteId, property: prop, period});

  return (
    <Table
      headerText={{key: 'Source', value: 'Visitors'}}
      data={breakdown?.map(d => ({key: d.property, value: d.visitors})) || []}
    />
  );
}

export default function SourcesCard() {
  return (
    <TabCard
      title="Top Sources"
      tabs={[
        {
          title: 'All',
          content: <SourcesTable prop="visit:source" />,
        },
        {
          title: 'Medium',
          content: <SourcesTable prop="visit:utm_medium" />,
        },
        {
          title: 'Source',
          content: <SourcesTable prop="visit:utm_source" />,
        },
        {
          title: 'Campaign',
          content: <SourcesTable prop="visit:utm_campaign" />,
        },
      ]}
    />
  );
}
