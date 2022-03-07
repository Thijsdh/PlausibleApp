import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../hooks';
import {fetchBreakdowns} from '../store/dashboard';
import {BreakdownResult} from '../types';
import TabCard from './TabCard';
import Table from './Table';

type Props = {};

function PageTable({data}: {data: BreakdownResult[]}) {
  return (
    <Table
      headerText={{key: 'Page', value: 'Visitors'}}
      data={data.map(d => ({key: d.page, value: d.visitors}))}
    />
  );
}

export default function PagesCard({}: Props) {
  const dispatch = useAppDispatch();
  const {pagesBreakdown} = useAppSelector(selector => selector.dashboard);

  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchBreakdowns());
  }, [dispatch, tabIndex]);

  return (
    <TabCard
      tabIndex={tabIndex}
      setTabIndex={setTabIndex}
      tabs={[
        {
          title: 'Top Pages',
          headerTitle: 'Top Pages',
          content: <PageTable data={pagesBreakdown.data || []} />,
        },
        {title: 'Entry Pages', headerTitle: 'Entry Pages', content: <></>},
        {title: 'Exit Pages', headerTitle: 'Exit Pages', content: <></>},
      ]}
    />
  );
}
