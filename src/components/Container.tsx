import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function Container({children, style, testID}: Props) {
  return (
    <View style={[styles.cardList, style]} testID={testID}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  cardList: {
    padding: 10,
  },
});
