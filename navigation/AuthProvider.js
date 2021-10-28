import React, { createContext, useState } from 'react'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    phoneNumber: '',
    isAuthenticated: false,
  })
  const [session, setSession] = useState({
    sessionId: '',
    startTime: '',
    endTime: '',
    isActive: false,
  })

  const startSession = () => {
    setSession({
      sessionId: 'abcd',
      startTime: new Date().toLocaleString(),
      endTime: '',
      isActive: true,
    })
  }

  const signUp = (phoneNumber) => {
    setUser({ phoneNumber, isAuthenticated: true })
  }

  return (
    <AuthContext.Provider
      value={{ user, signUp, session, startSession }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
