import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import OnboardingScreen from '../screens/OnboardingScreen'
import SignIn from '../screens/SignIn';
import PhoneInputScreen from '../screens/PhoneInputScreen';
import OTPInputScreen from '../screens/OTPInputScreen';
import PasswordInputScreen from '../screens/PasswordInputScreen';

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
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="PhoneInput" component={PhoneInputScreen} />
      <Stack.Screen name="OTPInput" component={OTPInputScreen} />
      <Stack.Screen name="PasswordInput" component={PasswordInputScreen} />
    </Stack.Navigator>
  )
}

export default AuthStack
