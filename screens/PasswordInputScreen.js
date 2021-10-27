import React, { useState, useRef, useEffect } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native'

const { width } = Dimensions.get('window')

const PasswordInputScreen = ({ navigation }) => {
  let textInput = useRef(null);

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [focusInput, setFocusInput] = useState(false)

  const onChangePassword = (text) => {
    setPassword(text)
  }

  const onChangeConfirmPassword = (text) => {
    setConfirmPassword(text)
  }

  const onPressContinue = () => {
    navigation.navigate('OTPInput')
  };

  const onChangeFocus = () => {
    setFocusInput(true)
  }

  const onChangeBlur = () => {
    setFocusInput(false)
  }

  useEffect(() => {
    textInput.focus()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior="padding">
        <Text style={styles.textTitle}>Step 3 of 3</Text>
        <View style={styles.wrapper}>
          <Text style={styles.title}>Enter your Password</Text>
          <View style={styles.passwordInput}>
            <TextInput
              ref={input => (textInput = input)}
              style={styles.password}
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={onChangePassword}
              autoFocus={focusInput}
              onFocus={onChangeFocus}
              onBlur={onChangeBlur}
            />
          </View>

          <View style={styles.passwordInput}>
            <TextInput
              style={styles.password}
              placeholder="Confirm Password"
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={onChangeConfirmPassword}
            />
          </View>
        </View>

        <View style={styles.viewBottom}>
          <TouchableOpacity style={styles.button} onPress={onPressContinue} disabled={password !== confirmPassword}>
            <Text style={styles.buttonText}>Finish</Text>
          </TouchableOpacity>
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
  passwordInput: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#d6d7da',
    height: 50,
    width: width - 40,
  },
  password: {
    marginLeft: 5,
    fontSize: 16,
    color: '#222',
  },
  viewBottom: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 40,
  },
  button: {
    width: width - 40,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0db665',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    alignItems: 'center',
    fontWeight: '500',
  },
})

export default PasswordInputScreen
