import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
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
import {TimeseriesDataPoint} from '../types';
import {rgba} from 'polished';

type Props = {
  data: TimeseriesDataPoint[];
  interpolation?: InterpolationPropType;
  height?: number;
  width?: number;
  bottomGradient?: boolean;
  touchable?: boolean;
  style?: StyleProp<ViewStyle>;
  showAxis?: boolean;
};

export default function Chart({
  data,
  interpolation,
  height = 250,
  width,
  bottomGradient,
  touchable,
  style,
  showAxis,
}: Props) {
  const colors = useColors();
  const theme = useTheme();

  let max = Math.ceil(Math.max(...data.map(d => d.visitors || 0)) * 1.5);
  max = Math.max(1, max);

  return (
    <View
      style={[styles.chartContainer, style]}
      pointerEvents={touchable ? 'auto' : 'none'}>
      {data.length > 0 && (
        <>
          <VictoryChart
            containerComponent={<VictoryVoronoiContainer />}
            domainPadding={{y: [0, 80]}}
            height={height}
            width={width}
            maxDomain={{y: max}}
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
            {showAxis && (
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
            )}
            <VictoryAxis crossAxis axisComponent={<></>} />
          </VictoryChart>
          {bottomGradient && (
            <LinearGradient
              colors={[rgba(colors.primary, 0.3), rgba(colors.primary, 0)]}
              style={styles.bottomGradient}
            />
          )}
        </>
      )}
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
