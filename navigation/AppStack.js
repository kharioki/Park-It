import React from 'react'
import { View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import DrawerContent from '../screens/DrawerContent';

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
          title: 'ParkIt',
          headerStyle: {
            backgroundColor: '#11111110',
            shadowColor: 'transparent',
            elevation: 0,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () => (
            <View style={{ marginLeft: 10 }}>
              <Ionicons.Button
                name="ios-menu"
                size={30}
                color="black"
                backgroundColor="transparent"
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
          headerRight: () => (
            <View style={{ marginRight: 10 }}>
              <Ionicons.Button
                name="md-navigate-outline"
                size={30}
                color="black"
                backgroundColor="transparent"
              />
            </View>
          ),
        }}
      />
    </Drawer.Navigator>
  )
}

export default AppStack
