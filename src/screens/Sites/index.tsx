import {NavigationProp} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RootStackParamList} from '../../../App';
import Card from '../../components/Card';
import Container from '../../components/Container';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchSites} from '../../store/sites';

type Props = {
  navigation: NavigationProp<RootStackParamList>;
};

export default function Sites({navigation}: Props) {
  const dispatch = useAppDispatch();
  const {sites} = useAppSelector(state => state.sites);

  useEffect(() => {
    dispatch(fetchSites());
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left']}>
      <ScrollView>
        <Container>
          {sites?.map(site => (
            <Card
              key={site.id}
              onPress={() =>
                navigation.navigate('Dashboard', {siteId: site.id})
              }>
              <Text>{site.id}</Text>
            </Card>
          ))}
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
