import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {faSignOut} from '@fortawesome/free-solid-svg-icons/faSignOut';
import SettingsItem from '../../components/SettingsItem';
import {RootStackParamList} from '../../Navigator';
import {logout} from '../../requests/login';

interface Props {
  navigation: NavigationProp<RootStackParamList>;
}

export default function Settings({navigation}: Props) {
  return (
    <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left']}>
      <ScrollView style={styles.scrollView}>
        <SettingsItem
          icon={faSignOut}
          text="Logout"
          onPress={() =>
            logout().then(() => navigation.reset({routes: [{name: 'Login'}]}))
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    padding: 16,
  },
});
