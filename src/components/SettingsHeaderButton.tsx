import React, {useState} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faGear} from '@fortawesome/free-solid-svg-icons/faGear';

interface Props {
  onPress?: () => void;
}

export default function SettingsHeaderButton({onPress}: Props) {
  const [isPressed, setIsPressed] = useState(false);
  return (
    <Pressable
      testID="ButtonSettings"
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}>
      <FontAwesomeIcon
        icon={faGear}
        size={20}
        style={[styles.icon, isPressed && styles.iconPressed]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  icon: {
    opacity: 0.8,
  },
  iconPressed: {
    opacity: 0.6,
  },
});
