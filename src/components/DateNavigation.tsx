import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import useTheme from '../Theme';
import dayjs from 'dayjs';

import {Resolution} from './HomeHeader';

type Props = {
  resolution: Resolution;
  date?: string;
  setDate: (date: string) => void;
};

export default function DateNavigation({resolution, date, setDate}: Props) {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 8,
      shadowColor: 'rgb(0, 0, 0)',
      shadowOpacity: 0.1,
      shadowRadius: 2,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      elevation: 2,
    },
    button: {
      display: 'flex',
      justifyContent: 'center',
      paddingHorizontal: 8,
      paddingVertical: 8,
      backgroundColor: theme.colors.card,
    },
    buttonLeft: {
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
      borderRightColor: 'rgba(0, 0, 0, 0.3)',
      borderRightWidth: 1,
    },
    buttonRight: {
      borderTopRightRadius: 4,
      borderBottomRightRadius: 4,
    },
    buttonDisabled: {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
  });

  const dateObj = dayjs(date);

  const prevDate = dateObj.subtract(1, resolution);
  const nextDate = dateObj.add(1, resolution);

  const goBack = () => setDate(prevDate.format('YYYY-MM-DD'));
  const goForward = () => setDate(nextDate.format('YYYY-MM-DD'));

  const forwardDisabled = nextDate.isAfter(dayjs());

  return (
    <View style={styles.container}>
      <Pressable style={[styles.button, styles.buttonLeft]} onPress={goBack}>
        <Text>&lt;</Text>
      </Pressable>
      <Pressable
        style={[
          styles.button,
          styles.buttonRight,
          forwardDisabled ? styles.buttonDisabled : null,
        ]}
        onPress={goForward}
        disabled={forwardDisabled}>
        <Text>&gt;</Text>
      </Pressable>
    </View>
  );
}
