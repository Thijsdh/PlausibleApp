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
import SourcesCard from '../../components/SourcesCard';
import LocationsCard from '../../components/LocationsCard';
import useTimeseries from '../../hooks/requests/useTimeseries';
import useRealtimeTimeseries from '../../hooks/requests/useRealtimeTimeseries';
import useAggregate from '../../hooks/requests/useAggregate';
import {Period} from '../../types';
import useRealtimeAggregate from '../../hooks/requests/useRealtimeAggregate';

type Props = {
  navigation: NavigationProp<RootStackParamList>;
  route: Route<'Dashboard', RootStackParamList['Dashboard']>;
};

export default function Dashboard({navigation, route}: Props) {
  // TODO: use Context for siteId and period
  const {siteId} = route.params;
  const [period, setPeriod] = useState<Period>({period: '30d'});

  const {
    timeseries,
    mutate: mutateTimeseries,
    isLoading: timeseriesLoading,
  } = useTimeseries(
    period.period !== 'realtime' ? {siteId, period} : undefined,
  );
  const {
    timeseries: realtimeTimeseries,
    mutate: mutateRealtimeTimeseries,
    isLoading: realtimeTimeseriesLoading,
  } = useRealtimeTimeseries(
    period.period === 'realtime' ? {siteId} : undefined,
  );

  const {
    aggregate,
    mutate: mutateAggregate,
    isLoading: aggregateLoading,
  } = useAggregate(period.period !== 'realtime' ? {siteId, period} : undefined);
  const {
    aggregate: realtimeAggregate,
    mutate: mutateRealtimeAggregate,
    isLoading: realtimeAggregateLoading,
  } = useRealtimeAggregate(period.period === 'realtime' ? siteId : undefined);

  const loading =
    timeseriesLoading ||
    realtimeTimeseriesLoading ||
    aggregateLoading ||
    realtimeAggregateLoading;
  const refresh = () => {
    mutateTimeseries();
    mutateRealtimeTimeseries();
    mutateAggregate();
    mutateRealtimeAggregate();
  };

  useEffect(() => {
    navigation.setOptions({title: siteId});
  }, [navigation, siteId]);

  return (
    <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left']}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refresh} />
        }>
        <HomeHeader
          siteId={siteId}
          period={period}
          onPeriodChange={setPeriod}
        />
        <Chart
          data={
            (period.period === 'realtime' ? realtimeTimeseries : timeseries) ??
            []
          }
          bottomGradient
          showAxis
          touchable
        />
        <Container style={{minHeight: 300}}>
          <StatsCard
            stats={period.period === 'realtime' ? realtimeAggregate : aggregate}
          />
          {period.period !== 'realtime' && (
            <>
              <SourcesCard siteId={siteId} period={period} />
              <PagesCard siteId={siteId} period={period} />
              <LocationsCard siteId={siteId} period={period} />
            </>
          )}
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
