import React from 'react'
import { View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import DrawerContent from '../screens/DrawerContent';
import ActiveSessions from '../screens/ActiveSessions';

const HomeStack = createStackNavigator();
const SessionsStack = createStackNavigator();

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

export const SessionsStackScreen = ({ navigation }) => {
  return (
    <SessionsStack.Navigator>
      <SessionsStack.Screen
        name="ActiveSessions"
        component={ActiveSessions}
        options={{
          title: 'Active Sessions',
          headerLeft: () => (
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
    </SessionsStack.Navigator>
  )
};

const AppStack = ({ navigation }) => {
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
        name="SessionsStack"
        component={SessionsStackScreen}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  )
}

export default AppStack
