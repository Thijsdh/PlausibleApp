import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Container from './Container';
import Select from './Select';

const PERIODS = [
  {label: 'Today', value: 'day'},
  {label: 'Realtime', value: 'realtime'},
  {label: 'Last 7 days', value: '7d'},
  {label: 'Last 30 days', value: '30d'},
  {label: 'Month to date', value: 'month'},
  {label: 'Last 6 months', value: '6mo'},
  {label: 'Last 12 months', value: '12mo'},
];

type HeaderProps = {
  realtimeVisitors?: number;
  period: string;
  setPeriod: (period: string) => void;
};

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

export default function HomeHeader({
  realtimeVisitors,
  period,
  setPeriod,
}: HeaderProps) {
  return (
    <Container>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {realtimeVisitors !== undefined ? (
            <VisitorCount realtimeVisitors={realtimeVisitors} />
          ) : null}
        </View>
        <View>
          <Select
            selectedValue={period}
            onValueChange={itemValue => setPeriod(itemValue)}
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
});
