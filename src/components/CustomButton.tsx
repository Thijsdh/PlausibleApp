import React from 'react';
import {Pressable, StyleProp, StyleSheet, Text, ViewStyle} from 'react-native';
import useTheme from '../Theme';

type Props = {
  testID?: string;
  onPress?: () => void;
  title?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export default function CustomButton({
  testID,
  onPress,
  title,
  disabled,
  style,
}: Props) {
  const theme = useTheme();
  return (
    <Pressable
      testID={testID}
      android_ripple={{color: theme.colors.primary}}
      style={[styles.button, style]}
      onPress={onPress}
      disabled={disabled}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgb(79, 70, 229)',
    borderRadius: 6,
    padding: 8,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: '#ffffff',
  },
});
