import { NavigationContainer } from '@react-navigation/native';
import { BottomTabsNavigator } from './src/screens/BottomTabs.navigator';
import { AppProvider } from './src/App.provider';

export const App = () => {
  return (
    <AppProvider>
      <NavigationContainer>
        <BottomTabsNavigator />
      </NavigationContainer>
    </AppProvider>
  );
};
