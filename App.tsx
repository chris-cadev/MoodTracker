import { NavigationContainer } from '@react-navigation/native';
import { BottomTabsNavigator } from './src/screens/BottomTabs.navigator';

export const App = () => {

  return (
    <NavigationContainer>
      <BottomTabsNavigator />
    </NavigationContainer>
  );
};
