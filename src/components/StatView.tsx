import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';

type Props = {
  title: string;
  value: string;
  change?: number;
  style?: StyleProp<ViewStyle>;
};

export default function StatView(props: Props) {
  const theme = useTheme();
  const color = theme.colors.text;
  return (
    <View style={props.style}>
      <Text style={{...styles.header, color}}>{props.title}</Text>
      <View style={styles.valueContainer}>
        <Text style={{...styles.value, color}}>{props.value}</Text>
        {props.change && (
          <Text style={{...styles.change, color}}>{props.change}%</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    textTransform: 'uppercase',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    opacity: 0.6,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    flexGrow: 1,
  },
  change: {
    fontSize: 12,
  },
});
