import React from 'react'
import { View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import DrawerContent from '../screens/DrawerContent';
import ActiveSessions from '../screens/ActiveSessions';
import DetailsScreen from '../screens/DetailsScreen';
import HistoryScreen from '../screens/HistoryScreen';
import CreateLotScreen from '../screens/CreateLotScreen';

const HomeStack = createStackNavigator();
const SessionsStack = createStackNavigator();
const HistoryStack = createStackNavigator();
const LotStack = createStackNavigator();

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
      <HomeStack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          presentation: 'modal',
          headerShown: false,
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

export const LotStackScreen = ({ navigation }) => {
  return (
    <LotStack.Navigator>
      <LotStack.Screen
        name="CreateLot"
        component={CreateLotScreen}
        options={{
          title: 'Add a Parking Lot',
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
    </LotStack.Navigator>
  )
};

export const HistoryStackScreen = ({ navigation }) => {
  return (
    <HistoryStack.Navigator>
      <HistoryStack.Screen
        name="History"
        component={HistoryScreen}
        options={{
          title: 'Completed Sessions',
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
    </HistoryStack.Navigator>
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
      <Drawer.Screen
        name="HistoryStack"
        component={HistoryStackScreen}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="LotStack"
        component={LotStackScreen}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  )
}

export default AppStack
