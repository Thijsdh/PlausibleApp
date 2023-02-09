import React from 'react';
import {
  LayoutChangeEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import useTheme from '../Theme';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  onLayout?: (event: LayoutChangeEvent) => void;
};

export default function Card({children, style, onPress, onLayout}: Props) {
  const theme = useTheme();

  return (
    <Pressable
      android_ripple={
        onPress !== undefined ? {color: theme.colors.primary} : undefined
      }
      style={[styles.card, style, {backgroundColor: theme.colors.card}]}
      onPress={onPress}
      onLayout={onLayout}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 5,
    shadowColor: 'rgb(0, 0, 0)',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    padding: 12,
    marginBottom: 18,
    elevation: 5,
  },
});
