import {NavigationProp} from '@react-navigation/native';
import {useEffect} from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet, View} from 'react-native';
import {RootStackParamList} from '../../../App';
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
