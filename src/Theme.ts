import {DarkTheme, DefaultTheme, Theme} from '@react-navigation/native';
import {useColorScheme} from 'react-native';
import useColors from './Colors';

const AppDefaultTheme: Theme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    text: 'rgb(31, 41, 55)',
    background: 'rgb(249, 250, 251)',
    card: 'rgb(255, 255, 255)',
  },
};

const AppDarkTheme: Theme = {
  dark: true,
  colors: {
    ...DarkTheme.colors,
    text: 'rgb(243, 244, 246)',
    background: 'rgb(17, 24, 39)',
    card: 'rgb(37, 47, 63)',
  },
};

export default function useTheme() {
  const scheme = useColorScheme();
  const colors = useColors();

  const theme = scheme === 'dark' ? AppDarkTheme : AppDefaultTheme;
  theme.colors.primary = colors.primary;
  return theme;
}
