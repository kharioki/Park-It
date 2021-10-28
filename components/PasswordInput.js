import React from 'react'
import { View, TextInput, StyleSheet, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

const PasswordInput = ({ val, placeholder, onChangePassword }) => {
  return (
    <View style={styles.passwordInput}>
      <TextInput
        style={styles.password}
        placeholder={placeholder}
        secureTextEntry={true}
        value={val}
        onChangeText={onChangePassword}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  passwordInput: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#d6d7da',
    width: width - 40,
  },
  password: {
    marginLeft: 5,
    fontSize: 15,
    color: '#222',
  },
})

export default PasswordInput
