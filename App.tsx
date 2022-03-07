import React from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import store from './src/store';
import {Provider} from 'react-redux';

import useTheme from './src/Theme';
import Login from './src/screens/Login';
import Sites from './src/screens/Sites';
import Dashboard from './src/screens/Dashboard';

export type RootStackParamList = {
  Login: undefined;
  Sites: undefined;
  Dashboard: {siteId: string};
};

const App = () => {
  const theme = useTheme();
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const navRef = useNavigationContainerRef<RootStackParamList>();

  return (
    <Provider store={store}>
      <NavigationContainer theme={theme} ref={navRef}>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Sites" component={Sites} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
