import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import LotHomeScreen from '../screens/LotHomeScreen';
import DrawerContent2 from '../screens/DrawerContent2';
import CreateLotScreen from '../screens/CreateLotScreen';

const LotHomeStack = createStackNavigator();
const LotStack = createStackNavigator();

const Drawer = createDrawerNavigator();

export const LotHomeStackScreen = ({ navigation }) => {
  return (
    <LotHomeStack.Navigator
    // screenOptions={{
    //   headerShown: false
    // }}
    >
      <LotHomeStack.Screen
        name="Home"
        component={LotHomeScreen}
        options={{
          title: 'Park-IT',
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
          headerRight: () => (
            <MaterialIcons.Button
              name="add-road"
              color="#0db665"
              size={30}
              backgroundColor="transparent"
              style={{ marginRight: 10 }}
              onPress={() => navigation.navigate('Create')}
            />
          ),
        }}
      />
      <LotHomeStack.Screen
        name="Create"
        component={CreateLotScreen}
        options={{
          title: 'Add a lot',
          presentation: 'modal',
          headerShown: false,
          // headerLeft: () => (
          //   <Ionicons.Button
          //     name="ios-menu"
          //     color="#222"
          //     size={30}
          //     backgroundColor="transparent"
          //     style={{ marginLeft: 10 }}
          //     onPress={() => navigation.openDrawer()}
          //   />
          // ),
        }}
      />
    </LotHomeStack.Navigator>
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

const OwnerStack = ({ navigation }) => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent2 {...props} />}>
      <Drawer.Screen
        name="LotHomeStack"
        component={LotHomeStackScreen}
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

export default OwnerStack
