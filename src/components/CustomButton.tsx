import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import useTheme from '../Theme';

type Props = {
  children?: React.ReactNode;
  onPress?: () => void;
  title?: string;
  disabled?: boolean;
};

export default function CustomButton(props: Props) {
  const theme = useTheme();
  return (
    <Pressable
      android_ripple={{color: theme.colors.primary}}
      style={styles.button}
      onPress={props.onPress}
      disabled={props.disabled}>
      <Text style={styles.text}>{props.title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgb(79, 70, 229)',
    borderRadius: 6,
    padding: 8,
    marginTop: 16,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: '#ffffff',
  },
});
