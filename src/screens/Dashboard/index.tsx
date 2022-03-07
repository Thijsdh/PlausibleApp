import {NavigationProp, Route} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {RefreshControl, ScrollView, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RootStackParamList} from '../../../App';
import Chart from '../../components/Chart';
import Container from '../../components/Container';
import HomeHeader from '../../components/HomeHeader';
import PagesCard from '../../components/PagesCard';
import StatsCard from '../../components/StatsCard';
import {useAppDispatch, useAppSelector} from '../../hooks';
import useInterval from '../../util/useInterval';
import {
  clearData,
  fetchData,
  setPeriod,
  setSiteId,
} from '../../store/dashboard';

type Props = {
  navigation: NavigationProp<RootStackParamList>;
  route: Route<'Dashboard', RootStackParamList['Dashboard']>;
};

export default function Dashboard({navigation, route}: Props) {
  const {siteId} = route.params;

  const {fetching, period, realtimeVisitors, timeseries, aggregate} =
    useAppSelector(state => state.dashboard);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSiteId(siteId));
    dispatch(fetchData());
    navigation.setOptions({
      title: siteId,
    });
  }, [dispatch, navigation, siteId]);

  useInterval(async () => {
    dispatch(fetchData());
  }, 60 * 1000);

  navigation.addListener('blur', () => dispatch(clearData()));

  return (
    <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left']}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={fetching}
            onRefresh={() => dispatch(fetchData())}
          />
        }>
        <HomeHeader
          realtimeVisitors={realtimeVisitors}
          period={period}
          setPeriod={p => dispatch(setPeriod(p))}
        />
        <Chart data={timeseries || []} />
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
