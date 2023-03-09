import {useTheme} from '@react-navigation/native';
import dayjs from 'dayjs';
import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SiteContext from '../contexts/SiteContext';
import useRealtimeVisitors from '../hooks/requests/useRealtimeVisitors';
import {Period} from '../types';
import Container from './Container';
import DateNavigation from './DateNavigation';
import Select from './Select';

export type Resolution = 'day' | 'month';

const PERIODS: {
  label: string;
  value: Period['period'];
  resolution?: Resolution;
}[] = [
  {label: 'Today', value: 'day', resolution: 'day'},
  {label: 'Realtime', value: 'realtime'},
  {label: 'Last 7 days', value: '7d'},
  {label: 'Last 30 days', value: '30d'},
  {label: 'Month to Date', value: 'month', resolution: 'month'},
  {label: 'Last 6 months', value: '6mo'},
  {label: 'Last 12 months', value: '12mo'},
];

function VisitorCount({realtimeVisitors}: {realtimeVisitors: number}) {
  const theme = useTheme();
  return (
    <View style={{...styles.visitorCount}}>
      <View style={[styles.statusIndicator]} />
      <Text style={{color: theme.colors.text}}>
        {realtimeVisitors} visitors
      </Text>
    </View>
  );
}

export default function HomeHeader() {
  const {siteId, period, setPeriod} = useContext(SiteContext);
  const {visitors: realtimeVisitors} = useRealtimeVisitors(
    period.period === 'realtime' ? siteId : undefined,
  );

  const resolution = PERIODS.find(p => p.value === period.period)?.resolution;

  let selectText: string | undefined;
  if (period.date) {
    const day = dayjs(period.date);
    if (resolution === 'day' && day.isSame(dayjs(), 'day')) {
      selectText = 'Today';
    } else if (resolution === 'month' && day.isSame(dayjs(), 'month')) {
      selectText = 'Month to Date';
    } else {
      selectText = day.format(resolution === 'month' ? 'MMMM YYYY' : 'D MMMM');
    }
  }

  return (
    <Container>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {realtimeVisitors !== undefined ? (
            <VisitorCount realtimeVisitors={realtimeVisitors} />
          ) : null}
        </View>
        <View style={styles.headerRight}>
          {resolution && (
            <DateNavigation
              resolution={resolution}
              date={period.date}
              setDate={date => setPeriod({...period, date})}
            />
          )}
          <Select<Period['period']>
            text={selectText}
            selectedValue={period.period}
            onValueChange={itemValue => setPeriod({period: itemValue})}
            items={PERIODS}
          />
        </View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  visitorCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    marginRight: 8,
    borderRadius: 4,
    backgroundColor: 'rgb(16, 185, 129)',
  },
  headerLeft: {
    flexGrow: 1,
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
  },
});
