import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../hooks';
import {fetchBreakdowns} from '../store/dashboard';
import {Property} from '../types';
import TabCard from './TabCard';
import Table from './Table';

function SourcesTable({prop}: {prop: Property}) {
  const dispatch = useAppDispatch();
  const {breakdowns} = useAppSelector(selector => selector.dashboard);

  useEffect(() => {
    if (breakdowns[prop] === undefined) dispatch(fetchBreakdowns([prop]));
  }, [breakdowns, dispatch, prop]);

  return (
    <Table
      headerText={{key: 'Source', value: 'Visitors'}}
      data={
        breakdowns[prop]?.map(d => ({key: d.property, value: d.visitors})) || []
      }
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
