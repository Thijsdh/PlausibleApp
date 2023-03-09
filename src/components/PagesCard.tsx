import React, {useContext} from 'react';
import SiteContext from '../contexts/SiteContext';
import useBreakdown from '../hooks/requests/useBreakdown';
import {Property} from '../types';
import TabCard from './TabCard';
import Table from './Table';

function PageTable({prop}: {prop: Property}) {
  const {siteId, period} = useContext(SiteContext);
  const {breakdown} = useBreakdown({siteId, property: prop, period});

  return (
    <Table
      headerText={{key: 'Page', value: 'Visitors'}}
      data={breakdown?.map(d => ({key: d.property, value: d.visitors})) || []}
    />
  );
}

export default function PagesCard() {
  return (
    <TabCard
      tabs={[
        {
          title: 'Top Pages',
          headerTitle: 'Top Pages',
          content: <PageTable prop="event:page" />,
        },
        {
          title: 'Entry Pages',
          headerTitle: 'Entry Pages',
          content: <PageTable prop="visit:entry_page" />,
        },
        {
          title: 'Exit Pages',
          headerTitle: 'Exit Pages',
          content: <PageTable prop="visit:exit_page" />,
        },
      ]}
    />
  );
}
