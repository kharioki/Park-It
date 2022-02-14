import React, { createContext, useState } from 'react'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    isAuthenticated: false,
  })
  const [address, setAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [userType, setUserType] = useState('')
  const [balance, setBalance] = useState(0)

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

  const signOut = () => {
    setUserType('')
  }

  return (
    <AuthContext.Provider
      value={{ user, session, startSession, endSession, signOut, userType, setUserType, address, setAddress, phoneNumber, setPhoneNumber, balance, setBalance }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
