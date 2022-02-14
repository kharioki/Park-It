import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import OnboardingScreen from '../screens/OnboardingScreen'
import ConnectWalletScreen from '../screens/ConnectWalletScreen';
import SelectUserTypeScreen from '../screens/SelectUserTypeScreen';

const Stack = createStackNavigator()

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
      initialRouteName="Onboarding"
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Connect" component={ConnectWalletScreen} />
      <Stack.Screen name="SelectUserType" component={SelectUserTypeScreen} />
    </Stack.Navigator>
  )
}

export default AuthStack
