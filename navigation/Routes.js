import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'

import AuthStack from './AuthStack'
import AppStack from './AppStack'
import OwnerStack from './OwnerStack'
import { AuthContext } from './AuthProvider'
import LinkingConfiguration from './LinkingConfiguration'

const Routes = () => {
  const { userType } = useContext(AuthContext)

  return (
    <NavigationContainer linking={LinkingConfiguration}>
      {!userType ? <AuthStack /> : userType === 'owner' ? <OwnerStack /> : <AppStack />}
    </NavigationContainer>
  )
}

export default Routes
