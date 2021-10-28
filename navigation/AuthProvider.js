import React, { createContext, useState } from 'react'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    phoneNumber: '',
    isAuthenticated: false,
  })

  const signUp = (phoneNumber) => {
    setUser({ phoneNumber, isAuthenticated: true })
  }

  return (
    <AuthContext.Provider value={{ user, signUp }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
