import React, {useContext} from 'react';
import SiteContext from '../contexts/SiteContext';
import useBreakdown from '../hooks/requests/useBreakdown';
import {Property} from '../types';
import TabCard from './TabCard';
import Table, {Props as TableProps} from './Table';

interface DevicesTableProps {
  prop: Property;
  headerText: TableProps['headerText'];
}

function DevicesTable({prop, headerText}: DevicesTableProps) {
  const {siteId, period} = useContext(SiteContext);
  const {breakdown} = useBreakdown({siteId, property: prop, period});

  return (
    <Table
      headerText={headerText}
      data={breakdown?.map(d => ({key: d.property, value: d.visitors})) || []}
    />
  );
}

export default function DevicesCard() {
  return (
    <TabCard
      tabs={[
        // Screen size is not supported by the API yet
        {
          headerTitle: 'Devices',
          title: 'Browser',
          content: (
            <DevicesTable
              prop="visit:browser"
              headerText={{key: 'Browser', value: 'Visitors'}}
            />
          ),
        },
        {
          headerTitle: 'Devices',
          title: 'OS',
          content: (
            <DevicesTable
              prop="visit:os"
              headerText={{key: 'Operating system', value: 'Visitors'}}
            />
          ),
        },
      ]}
    />
  );
}
