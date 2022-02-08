import React from 'react';
import {StyleSheet, View} from 'react-native';
import {InterpolationPropType} from 'victory-core';
import LinearGradient from 'react-native-linear-gradient';

import {
  VictoryArea,
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from 'victory-native';
import useColors from '../Colors';
import useTheme from '../Theme';
import {TimeseriesDataPoint} from '../Types';
import {rgba} from 'polished';

type Props = {
  data: TimeseriesDataPoint[];
  interpolation?: InterpolationPropType;
};

export default function Chart({data, interpolation}: Props) {
  const colors = useColors();
  const theme = useTheme();

  return (
    <View style={styles.chartContainer}>
      <VictoryChart
        containerComponent={<VictoryVoronoiContainer />}
        domainPadding={{y: [0, 80]}}
        height={250}
        padding={{top: 50, bottom: 0, left: 0, right: 0}}>
        <VictoryArea
          labelComponent={
            <VictoryTooltip constrainToVisibleArea renderInPortal={false} />
          }
          labels={({datum}) => `${datum.date}\n${datum.visitors} Visitors`}
          interpolation={interpolation}
          data={data}
          x="date"
          y="visitors"
          style={{
            data: {
              fill: colors.primary,
              fillOpacity: 0.3,
              stroke: colors.primary,
              strokeWidth: 3,
            },
          }}
        />
        {/* <VictoryAxis
        crossAxis
        tickFormat={(t: string) => new Date(t).toLocaleDateString()}
        tickCount={3}
        axisComponent={<></>}
        tickLabelComponent={<VictoryLabel angle={-45} />}
      /> */}
        <VictoryAxis
          dependentAxis
          axisComponent={<></>}
          tickLabelComponent={
            <VictoryLabel
              dx={15}
              dy={-10}
              textAnchor="start"
              style={{fill: theme.colors.text, opacity: 0.75}}
            />
          }
          style={{
            grid: {
              stroke: 'rgba(0, 0, 0, 0.1)',
            },
          }}
        />
        {/* <VictoryAxis dependentAxis axisComponent={<></>} /> */}
        <VictoryAxis crossAxis axisComponent={<></>} />
      </VictoryChart>
      <LinearGradient
        colors={[rgba(colors.primary, 0.3), rgba(colors.primary, 0)]}
        style={styles.bottomGradient}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1,
    display: 'flex',
  },
  bottomGradient: {
    width: '100%',
    height: 300,
    marginBottom: -280,
  },
});
