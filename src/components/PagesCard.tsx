import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../hooks';
import {fetchBreakdowns} from '../store/dashboard';
import {Property} from '../types';
import TabCard from './TabCard';
import Table from './Table';

function PageTable({prop}: {prop: Property}) {
  const dispatch = useAppDispatch();
  const {breakdowns} = useAppSelector(selector => selector.dashboard);

  useEffect(() => {
    if (breakdowns[prop] === undefined) dispatch(fetchBreakdowns([prop]));
  }, [breakdowns, dispatch, prop]);

  return (
    <Table
      headerText={{key: 'Page', value: 'Visitors'}}
      data={
        breakdowns[prop]?.map(d => ({key: d.property, value: d.visitors})) || []
      }
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
