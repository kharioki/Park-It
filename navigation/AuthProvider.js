import React, { createContext, useState } from 'react'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    phoneNumber: '',
    isAuthenticated: false,
  })
  const [userType, setUserType] = useState('')

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

  const endSession = () => {
    setSession({
      sessionId: 'abcd',
      startTime: '',
      endTime: new Date().toLocaleString(),
      isActive: false,
    })
  }

  const signUp = (phoneNumber) => {
    setUser({ phoneNumber, isAuthenticated: true })
  }

  const signOut = () => {
    setUserType('')
  }

  return (
    <AuthContext.Provider
      value={{ user, signUp, session, startSession, endSession, signOut, userType, setUserType }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
