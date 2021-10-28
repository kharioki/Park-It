import React, { useState, useContext } from 'react'
import {
  View, Text, SafeAreaView, KeyboardAvoidingView, StyleSheet, Dimensions,
} from 'react-native'
import Button from '../components/Button'
import PasswordInput from '../components/PasswordInput'
import { AuthContext } from '../navigation/AuthProvider'

const { width } = Dimensions.get('window')

const PasswordInputScreen = ({ navigation }) => {
  const { signUp } = useContext(AuthContext)

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const onChangePassword = (text) => {
    setPassword(text)
  }

  const onChangeConfirmPassword = (text) => {
    setConfirmPassword(text)
  }

  const onPressFinishSignup = () => {
    signUp('+254729918514')
    // navigation.navigate('OTPInput')
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior="padding">
        <Text style={styles.textTitle}>Step 3 of 3</Text>
        <View style={styles.wrapper}>
          <Text style={styles.title}>Enter your Password</Text>
          <PasswordInput
            val={password}
            placeholder="Password"
            onChangePassword={onChangePassword} />

          <PasswordInput
            val={confirmPassword}
            placeholder="Confirm Password"
            onChangePassword={onChangeConfirmPassword} />
        </View>

        <View style={styles.viewBottom}>
          <Button text="Finish" onPress={onPressFinishSignup} isDisabled={password !== confirmPassword} />
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoidingView: {
    flex: 1,
    padding: 10,
  },
  textTitle: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    textAlign: 'left',
    color: '#555',
    letterSpacing: 1,
  },
  wrapper: {
    flex: 1,
    width: width - 20,
    paddingHorizontal: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#333',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  viewBottom: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 40,
  },
})

export default PasswordInputScreen
