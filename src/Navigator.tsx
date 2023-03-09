import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import useTheme from './Theme';

import Loading from './screens/Loading';
import Login from './screens/Login';
import Sites from './screens/Sites';
import Dashboard from './screens/Dashboard';
import SettingsHeaderButton from './components/SettingsHeaderButton';
import Settings from './screens/Settings';

export type RootStackParamList = {
  Loading: undefined;
  Login: undefined;
  Sites: undefined;
  Dashboard: {siteId: string};
  Settings: undefined;
};

export default function Navigator() {
  const theme = useTheme();
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const navRef = useNavigationContainerRef<RootStackParamList>();

  return (
    <NavigationContainer theme={theme} ref={navRef}>
      <Stack.Navigator>
        <Stack.Screen
          name="Loading"
          component={Loading}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="Sites"
          component={Sites}
          options={{
            headerRight: () => (
              <SettingsHeaderButton
                onPress={() => navRef.navigate('Settings')}
              />
            ),
          }}
        />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
