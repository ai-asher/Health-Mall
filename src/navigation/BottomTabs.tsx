import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import MessagesScreen from '../screens/MessagesScreen';
import HealthScreen from '../screens/HealthScreen';
import FeaturedScreen from '../screens/FeaturedScreen';
import SelectionScreen from '../screens/SelectionScreen';
import MineScreen from '../screens/MineScreen';
import { colors } from '../theme/colors';

export type RootTabParamList = {
  Messages: undefined;
  Health: undefined;
  Featured: undefined;
  Selection: undefined;
  Mine: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

const iconMap: Record<keyof RootTabParamList, { active: IoniconName; inactive: IoniconName }> = {
  Messages: { active: 'chatbubble', inactive: 'chatbubble-outline' },
  Health: { active: 'add-circle', inactive: 'add-circle-outline' },
  Featured: { active: 'play-circle', inactive: 'play-circle-outline' },
  Selection: { active: 'bag', inactive: 'bag-outline' },
  Mine: { active: 'person', inactive: 'person-outline' },
};

const labelMap: Record<keyof RootTabParamList, string> = {
  Messages: '消息',
  Health: '健康',
  Featured: '精选',
  Selection: '优选',
  Mine: '我的',
};

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: { fontSize: 12, fontWeight: '500' },
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: colors.divider,
          height: 84,
          paddingBottom: 24,
          paddingTop: 8,
        },
        tabBarLabel: labelMap[route.name],
        tabBarIcon: ({ color, focused, size }) => {
          const name = focused ? iconMap[route.name].active : iconMap[route.name].inactive;
          return <Ionicons name={name} size={size ?? 26} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Health" component={HealthScreen} />
      <Tab.Screen name="Featured" component={FeaturedScreen} />
      <Tab.Screen name="Selection" component={SelectionScreen} />
      <Tab.Screen name="Mine" component={MineScreen} />
    </Tab.Navigator>
  );
}
