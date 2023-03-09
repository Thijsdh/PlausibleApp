import React from 'react';
import {SWRConfig} from 'swr';
import {AppState, AppStateStatus, StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import useTheme from './src/Theme';
import Navigator from './src/Navigator';

const App = () => {
  const theme = useTheme();

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
      <SafeAreaProvider>
        <StatusBar backgroundColor={theme.colors.background} translucent />
        <Navigator />
      </SafeAreaProvider>
    </SWRConfig>
  );
};

export default App;
