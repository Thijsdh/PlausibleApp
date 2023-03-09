import {NavigationProp, Route} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RootStackParamList} from '../../Navigator';
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
import SiteContext from '../../contexts/SiteContext';

type Props = {
  navigation: NavigationProp<RootStackParamList>;
  route: Route<'Dashboard', RootStackParamList['Dashboard']>;
};

export default function Dashboard({navigation, route}: Props) {
  const {siteId} = route.params;
  const [period, setPeriod] = useState<Period>({period: '30d'});
  const [chartTouched, setChartTouched] = useState(false);

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
    <SiteContext.Provider value={{siteId, period, setPeriod}}>
      <ScrollView
        scrollEnabled={!chartTouched}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refresh} />
        }>
        <SafeAreaView
          style={styles.container}
          edges={['right', 'bottom', 'left']}>
          <HomeHeader />
          <Chart
            data={
              (period.period === 'realtime'
                ? realtimeTimeseries
                : timeseries) ?? []
            }
            bottomGradient
            showAxis
            touchable
            onTouchedChanged={setChartTouched}
          />
          <Container style={{minHeight: 300}}>
            <StatsCard
              stats={
                period.period === 'realtime' ? realtimeAggregate : aggregate
              }
            />
            {period.period !== 'realtime' && (
              <>
                <SourcesCard />
                <PagesCard />
                <LocationsCard />
              </>
            )}
          </Container>
        </SafeAreaView>
      </ScrollView>
    </SiteContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
