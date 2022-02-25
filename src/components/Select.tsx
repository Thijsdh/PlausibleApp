import {Picker} from '@react-native-picker/picker';
import {useTheme} from '@react-navigation/native';
import React, {useRef} from 'react';
import {ActionSheetIOS, Button, Platform, StyleSheet} from 'react-native';

type Props<T> = {
  text?: string;
  items: {
    label: string;
    value: T;
  }[];
  selectedValue: T;
  onValueChange: (value: T) => void;
};

export default function Select<T>(props: Props<T>) {
  const theme = useTheme();

  const pickerRef = useRef<Picker<T> | null>(null);

  const {items, selectedValue, onValueChange} = props;
  const selectedItem = items.find(({value}) => value === selectedValue);

  function showActionSheet() {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [...items.map(item => item.label), 'Close'],
        cancelButtonIndex: items.length,
      },
      buttonIndex => {
        // Ignore cancel button
        if (buttonIndex !== items.length) {
          onValueChange(items[buttonIndex].value);
        }
      },
    );
  }

  function showPicker() {
    pickerRef.current?.focus();
  }

  return (
    <>
      <Picker
        mode="dropdown"
        ref={pickerRef}
        style={styles.picker}
        itemStyle={{...styles.pickerItem, color: theme.colors.text}}
        selectedValue={selectedValue}
        onValueChange={onValueChange}>
        {items.map(i => (
          <Picker.Item key={i.label} {...i} />
        ))}
      </Picker>
      <Button
        title={props.text || selectedItem?.label || ''}
        onPress={Platform.OS === 'ios' ? showActionSheet : showPicker}
      />
    </>
  );
}

const styles = StyleSheet.create({
  picker: {
    display: 'none',
  },
  pickerItem: {
    textAlign: 'right',
  },
});
