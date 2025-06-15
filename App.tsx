import { NavigationContainer } from '@react-navigation/native';
import { BottomTabsNavigator } from './src/screens/BottomTabs.navigator';
import { AppProvider } from './src/App.provider';
import { Platform, UIManager } from 'react-native';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const App = () => {
  return (
    <AppProvider>
      <NavigationContainer>
        <BottomTabsNavigator />
      </NavigationContainer>
    </AppProvider>
  );
};
