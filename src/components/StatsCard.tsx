import React, {useEffect} from 'react';
import {LogBox, StyleSheet} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import {AggregateResult, LiveStats} from '../types';
import Card from './Card';
import StatView from './StatView';

type Props = {
  stats?: AggregateResult | LiveStats;
};

export default function StatsCard({stats}: Props) {
  // See: https://github.com/saleel/react-native-super-grid/issues/170
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  if (!stats) {
    return null;
  }

  let items: {title: string; value?: string}[] = [];

  if (stats.statType === 'aggregate') {
    items = [
      {
        title: 'Unique visitors',
        value: stats.visitors?.value.toString(),
      },
      {
        title: 'Total pageviews',
        value: stats.pageviews?.value.toString(),
      },
      {
        title: 'Bounce rate',
        value: stats.bounce_rate?.value.toString() + '%',
      },
      {
        title: 'Visit duration',
        value: stats.visit_duration?.value.toString() + 's',
      },
    ];
  } else if (stats.statType === 'live_stats') {
    items = [
      {
        title: 'Current visitors',
        value: stats.current_visitors?.toString(),
      },
      {
        title: 'Unique visitors\n(last 30 min)',
        value: stats.unique_visitors?.toString(),
      },
      {
        title: 'Pageviews\n(last 30 min)',
        value: stats.pageviews?.toString(),
      },
    ];
  }

  return (
    <Card style={styles.statsCard}>
      <FlatGrid
        data={items}
        renderItem={({item}) =>
          item.value ? (
            <StatView
              title={item.title}
              value={item.value}
              style={styles.statView}
            />
          ) : null
        }
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  statsCard: {
    flexDirection: 'row',
  },
  statView: {
    paddingHorizontal: 8,
  },
});
