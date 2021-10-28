import React from 'react'
import { View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import DrawerContent from '../screens/DrawerContent';
import ActiveSessions from '../screens/ActiveSessions';

const HomeStack = createStackNavigator();

const Drawer = createDrawerNavigator();

export const HomeStackScreen = ({ navigation }) => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'ParkIt',

        }}
      />
    </HomeStack.Navigator>
  )
};

const AppStack = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="HomeStack"
        component={HomeStackScreen}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="ActiveSessions"
        component={ActiveSessions}
        options={{
          title: 'Active Sessions',
          headerLeft: ({ navigation }) => (
            <Ionicons.Button
              name="ios-menu"
              color="#222"
              size={30}
              backgroundColor="transparent"
              style={{ marginLeft: 10 }}
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  )
}

export default AppStack
