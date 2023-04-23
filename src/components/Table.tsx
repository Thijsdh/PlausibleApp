import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import useTheme from '../Theme';

export interface Props {
  headerText: {
    key: string;
    value: string;
  };
  data: {
    key: string;
    value: number;
  }[];
}

export default function Table({headerText, data}: Props) {
  const theme = useTheme();

  const maxValue = Math.max(...data.map(d => d.value));
  return (
    <View>
      <View style={styles.header}>
        <Text style={[styles.headerText, styles.headerKeyText]}>
          {headerText.key}
        </Text>
        <Text style={styles.headerText}>{headerText.value}</Text>
      </View>
      {data.map(row => (
        <View style={styles.row} key={row.key}>
          <View style={styles.keyContainer}>
            <Text style={styles.key}>{row.key}</Text>
            <View
              style={{
                ...styles.backgroundBar,
                width: `${(row.value / maxValue) * 100}%`,
                backgroundColor: theme.colors.primary,
              }}
            />
          </View>
          <Text style={styles.rowValue}>{row.value}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
  },
  headerText: {
    fontWeight: '700',
  },
  headerKeyText: {
    flexGrow: 1,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  keyContainer: {
    flexGrow: 1,
    flexShrink: 1,
    position: 'relative',
  },
  key: {
    padding: 8,
  },
  backgroundBar: {
    position: 'absolute',
    top: 4,
    bottom: 4,
    left: 0,
    opacity: 0.2,
  },
  rowValue: {
    width: 60,
    textAlign: 'right',
  },
});
