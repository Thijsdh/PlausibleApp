import {NavigationProp, Route} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RootStackParamList} from '../../../App';
import Chart from '../../components/Chart';
import Container from '../../components/Container';
import HomeHeader from '../../components/HomeHeader';
import PagesCard from '../../components/PagesCard';
import StatsCard from '../../components/StatsCard';
import {
  getAggregate,
  getRealtimeVisitors,
  getTimeseries,
} from '../../requests/stats';
import {
  AggregateResult,
  LiveStats,
  Period,
  TimeseriesDataPoint,
} from '../../types';
import useInterval from '../../util/useInterval';

type Props = {
  navigation: NavigationProp<RootStackParamList>;
  route: Route<'Dashboard', RootStackParamList['Dashboard']>;
};

export default function Dashboard({navigation, route}: Props) {
  const {siteId} = route.params;

  const [refreshing, setRefreshing] = useState(false);
  const [period, setPeriod] = useState<Period>({period: '30d'});

  const [realtimeVisitors, setRealtimeVisitors] = useState<
    number | undefined
  >();
  const [timeseries, setTimeseries] = useState<TimeseriesDataPoint[]>([]);
  const [aggregate, setAggregate] = useState<
    AggregateResult | LiveStats | undefined
  >();

  useEffect(() => {
    navigation.setOptions({
      title: siteId,
    });
  }, [navigation, siteId]);

  async function onRefresh() {
    setRefreshing(true);
    try {
      setRealtimeVisitors(await getRealtimeVisitors(siteId));
      setTimeseries((await getTimeseries(siteId, period)) || []);
      setAggregate(await getAggregate(siteId, period));
    } finally {
      setRefreshing(false);
    }
  }

  useEffect(() => {
    async function load() {
      setRefreshing(true);
      try {
        setRealtimeVisitors(await getRealtimeVisitors(siteId));
        setTimeseries((await getTimeseries(siteId, period)) || []);
        setAggregate(await getAggregate(siteId, period));
      } finally {
        setRefreshing(false);
      }
    }
    load();
  }, [siteId, period, setRealtimeVisitors, setTimeseries, setAggregate]);

  useInterval(async () => {
    setRealtimeVisitors(await getRealtimeVisitors(siteId));
    setTimeseries((await getTimeseries(siteId, period)) || []);
    setAggregate(await getAggregate(siteId, period));
  }, 60 * 1000);

  return (
    <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left']}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <HomeHeader
          realtimeVisitors={realtimeVisitors}
          period={period}
          setPeriod={setPeriod}
        />
        <Chart data={timeseries} />
        <Container style={{minHeight: 300}}>
          <StatsCard stats={aggregate} />
          <PagesCard />
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
