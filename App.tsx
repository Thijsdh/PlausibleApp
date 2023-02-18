import React from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import useTheme from './src/Theme';
import Login from './src/screens/Login';
import Sites from './src/screens/Sites';
import Dashboard from './src/screens/Dashboard';
import {SWRConfig} from 'swr';
import {AppState, AppStateStatus, StatusBar} from 'react-native';
import Loading from './src/screens/Loading';

export type RootStackParamList = {
  Loading: undefined;
  Login: undefined;
  Sites: undefined;
  Dashboard: {siteId: string};
};

const App = () => {
  const theme = useTheme();
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const navRef = useNavigationContainerRef<RootStackParamList>();

  return (
    <SWRConfig
      value={{
        provider: () => new Map(),
        isVisible() {
          return true;
        },
        initFocus(callback) {
          let appState = AppState.currentState;

          const onAppStateChange = (nextAppState: AppStateStatus) => {
            /* If it's resuming from background or inactive mode to active one */
            if (
              appState.match(/inactive|background/) &&
              nextAppState === 'active'
            ) {
              callback();
            }
            appState = nextAppState;
          };

          // Subscribe to the app state change events
          const subscription = AppState.addEventListener(
            'change',
            onAppStateChange,
          );

          return () => {
            subscription.remove();
          };
        },
      }}>
      <StatusBar backgroundColor={theme.colors.background} />
      <NavigationContainer theme={theme} ref={navRef}>
        <Stack.Navigator>
          <Stack.Screen
            name="Loading"
            component={Loading}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Sites" component={Sites} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </SWRConfig>
  );
};

export default App;
