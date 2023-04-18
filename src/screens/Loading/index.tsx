import React, {useEffect} from 'react';
import {NavigationProp} from '@react-navigation/native';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RootStackParamList} from '../../Navigator';
import {isLoggedIn} from '../../requests/login';

interface Props {
  navigation: NavigationProp<RootStackParamList>;
}

function Loading({navigation}: Props) {
  useEffect(() => {
    isLoggedIn().then(loggedIn => {
      navigation.reset({routes: [{name: loggedIn ? 'Sites' : 'Login'}]});
    });
  }, [navigation]);
  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Loading;
