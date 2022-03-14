import React from 'react';
import {StyleSheet} from 'react-native';
import {AggregateResult, LiveStats} from '../types';
import Card from './Card';
import StatView from './StatView';

type Props = {
  stats?: AggregateResult | LiveStats;
};

export default function StatsCard({stats}: Props) {
  if (!stats) return null;

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
      {items.map(item =>
        item.value ? (
          <StatView
            key={item.title}
            title={item.title}
            value={item.value}
            style={styles.statView}
          />
        ) : null,
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  statsCard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  statView: {
    padding: 8,
    width: '50%',
  },
});
