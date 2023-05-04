import React, {useState} from 'react';
import {Image, LayoutChangeEvent, StyleSheet, Text, View} from 'react-native';
import useTimeseries from '../hooks/requests/useTimeseries';
import {Site} from '../types';
import Card from './Card';
import Chart from './Chart';

interface Props {
  site: Site;
  onPress?: () => void;
}

function SiteCard({site, onPress}: Props) {
  const {timeseries} = useTimeseries({
    siteId: site.id,
    period: {period: '30d'},
  });

  const [width, setWidth] = useState(0);

  const handleLayout = (event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width);
  };

  return (
    <Card
      testID="SiteCard"
      key={site.id}
      onPress={onPress}
      style={styles.card}
      onLayout={handleLayout}>
      <Chart
        data={timeseries ?? []}
        style={styles.chart}
        height={100}
        width={width}
      />
      <View style={styles.cardContent}>
        {site.faviconUrl && (
          <Image source={{uri: site.faviconUrl}} style={styles.favicon} />
        )}
        <Text>{site.id}</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    height: 100,
  },
  chart: {
    position: 'absolute',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  favicon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
});

export default SiteCard;
