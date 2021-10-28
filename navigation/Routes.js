import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'

import AuthStack from './AuthStack'
import AppStack from './AppStack'
import { AuthContext } from './AuthProvider'

const Routes = () => {
  const { user } = useContext(AuthContext)
  const { phoneNumber, isAuthenticated } = user

  console.log('phoneNumber: ', phoneNumber);
  console.log('isAuthenticated: ', isAuthenticated);
  return (
    <NavigationContainer>
      {!isAuthenticated ? <AuthStack /> : <AppStack />}
    </NavigationContainer>
  )
}

export default Routes
