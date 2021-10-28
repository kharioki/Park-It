import React from 'react'
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native'

const { width } = Dimensions.get('window');

const Button = ({ text, onPress, isClear, isDisabled }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: isDisabled ? 'gray' : isClear ? '#fff' : '#0db665' }]}
      disabled={isDisabled}
      onPress={onPress}>
      <Text
        style={[styles.buttonText, { color: isClear ? '#0db665' : '#fff' }]}>
        {text}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: width - 40,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    alignItems: 'center',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
})

export default Button
