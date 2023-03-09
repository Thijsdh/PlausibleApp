import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import useTheme from '../Theme';

interface Props {
  icon?: IconProp;
  text: string;
  onPress?: () => void;
}

export default function SettingsItem({icon, text, onPress}: Props) {
  const theme = useTheme();

  return (
    <Pressable
      style={[styles.container, {backgroundColor: theme.colors.card}]}
      onPress={onPress}>
      <View
        style={[styles.iconContainer, {backgroundColor: theme.colors.primary}]}>
        {icon && <FontAwesomeIcon icon={icon} style={styles.icon} />}
      </View>
      <Text>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderRadius: 10,
  },
  icon: {
    color: '#fff',
  },
});
