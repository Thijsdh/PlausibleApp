import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default function Container({children, style}: Props) {
  return <View style={[styles.cardList, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  cardList: {
    padding: 10,
  },
});
