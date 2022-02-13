import {NavigationProp} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RootStackParamList} from '../../../App';
import Card from '../../components/Card';
import Container from '../../components/Container';
import {getSites} from '../../requests/dashboard';
import {Site} from '../../types';

type Props = {
  navigation: NavigationProp<RootStackParamList>;
};

export default function Sites({navigation}: Props) {
  const [sites, setSites] = useState<Site[]>([]);

  useEffect(() => {
    getSites().then(setSites);
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left']}>
      <ScrollView>
        <Container>
          {sites.map(site => (
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
