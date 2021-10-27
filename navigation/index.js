import React from 'react'
import { Provider as PaperProvider } from 'react-native-paper'

import Routes from './Routes'

const Providers = () => {
  return (
    <PaperProvider>
      <Routes />
    </PaperProvider>
  )
}

export default Providers
