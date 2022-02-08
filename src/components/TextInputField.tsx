import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TextInput, TextInputProps} from 'react-native';

type Props = {
  label?: string;
} & TextInputProps;

export default function TextInputField(props: Props) {
  const theme = useTheme();

  const styles = StyleSheet.create({
    label: {
      color: theme.colors.text,
      marginVertical: 8,
      fontWeight: 'bold',
    },
    input: {
      borderRadius: 4,
      backgroundColor: theme.colors.background,
      color: theme.colors.text,
      padding: 8,
    },
  });

  return (
    <>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
      <TextInput
        style={styles.input}
        accessibilityLabel={props.label}
        {...props}
      />
    </>
  );
}
