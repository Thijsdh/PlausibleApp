import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RootStackParamList} from '../../../App';
import Card from '../../components/Card';
import Container from '../../components/Container';
import CustomButton from '../../components/CustomButton';
import useSites from '../../hooks/requests/useSites';
import {logout} from '../../requests/login';

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
              <Card
                key={site.id}
                onPress={() =>
                  navigation.navigate('Dashboard', {siteId: site.id})
                }>
                <View style={styles.cardContent}>
                  {site.faviconUrl && (
                    <Image
                      source={{uri: site.faviconUrl}}
                      style={styles.favicon}
                    />
                  )}
                  <Text>{site.id}</Text>
                </View>
              </Card>
            ))
          )}
          <CustomButton
            title="Logout"
            onPress={() =>
              logout().then(() => navigation.reset({routes: [{name: 'Login'}]}))
            }
          />
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
  cardContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  favicon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
});
