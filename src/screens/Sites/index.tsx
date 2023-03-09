import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {ActivityIndicator, ScrollView, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RootStackParamList} from '../../Navigator';
import Container from '../../components/Container';
import SiteCard from '../../components/SiteCard';
import useSites from '../../hooks/requests/useSites';

type Props = {
  navigation: NavigationProp<RootStackParamList>;
};

export default function Sites({navigation}: Props) {
  const {sites, isLoading} = useSites();

  return (
    <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left']}>
      <ScrollView>
        <Container>
          {isLoading ? (
            <ActivityIndicator style={styles.activityIndicator} />
          ) : (
            sites?.map(site => (
              <SiteCard
                key={site.id}
                site={site}
                onPress={() =>
                  navigation.navigate('Dashboard', {siteId: site.id})
                }
              />
            ))
          )}
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityIndicator: {
    margin: 16,
  },
});
