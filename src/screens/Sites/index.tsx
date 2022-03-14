import {NavigationProp} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RootStackParamList} from '../../../App';
import Card from '../../components/Card';
import Container from '../../components/Container';
import CustomButton from '../../components/CustomButton';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {logout} from '../../requests/login';
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
          ))}
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
