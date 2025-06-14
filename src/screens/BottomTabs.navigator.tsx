import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from './Home.screen';
import { History } from './History.screen';
import { Analytics } from './Analytics.screen';
import { AnalyticsIcon, HomeIcon, ListIcon } from '../components/Icons';
import { theme } from '../theme';

const BottomTabs = createBottomTabNavigator();
const IconsMap = {
    Home: HomeIcon,
    History: ListIcon,
    Analytics: AnalyticsIcon,
};
type RouteName = keyof typeof IconsMap;

const getIcon = (routeName: RouteName) => ({ color, size }: { color: string, size: number }) => {
    const Icon = IconsMap[routeName];
    if (!Icon) return null;
    return <Icon color={color} size={size} />;
}

export const BottomTabsNavigator: React.FC = () => {
    return (
        <BottomTabs.Navigator screenOptions={({ route }) => ({
            tabBarActiveTintColor: theme.colorBlue,
            tabBarInactiveTintColor: theme.colorGrey,
            tabBarShowLabel: false,
            headerTitleStyle: { fontFamily: theme.fontFamilyBold, textAlign: 'center' },
            tabBarIcon: getIcon(route.name as RouteName),
        })}>
            <BottomTabs.Screen name="Home" component={Home} options={{ title: "Today's Mood" }} />
            <BottomTabs.Screen name="History" component={History} options={{ title: "Past Moods" }} />
            <BottomTabs.Screen name="Analytics" component={Analytics} options={{ title: "Fancy Charts" }} />
        </BottomTabs.Navigator>
    );
};