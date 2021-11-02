import React, { useState, useRef } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { Modal, RadioButton } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { carTypes } from '../utils/carTypes'

const RegModal = ({ visible, onStartSession, onHideModal, regNumber, onChangeRegNumber }) => {
  const [selectedCarType, setSelectedCarType] = useState(1)

  const onSubmit = () => {
    onStartSession()
    onHideModal()
  }

  return (
    <Modal visible={visible} onDismiss={onHideModal} contentContainerStyle={styles.modalContainer}>
      <View>
        <Text style={styles.text}>Enter vehicle Reg. Number:</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. KBU 000Y"
          value={regNumber}
          autoCompleteType="off"
          autoCorrect={false}
          autoCapitalize="characters"
          onChangeText={(text) => onChangeRegNumber(text)} />

        <View style={styles.radioContainer}>
          <Text style={styles.text}>Vehicle Type:</Text>
          <RadioButton.Group value={selectedCarType} onValueChange={value => setSelectedCarType(value)}>
            {carTypes.map(({ value, name }, index) => (
              <RadioButton.Item key={index} value={value} label={name} color="#0db665" uncheckedColor="#0db665" />
            ))}
          </RadioButton.Group>
        </View>

        <TouchableOpacity
          style={[styles.startBtn, { backgroundColor: regNumber.length > 0 ? '#0db665' : 'gray' }]}
          disabled={regNumber.length === 0}
          onPress={() => onSubmit()}>
          <MaterialCommunityIcons name="car-convertible" size={30} color="white" />
          <Text style={styles.startBtnText}>Start Session</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  text: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
  },
  input: {
    borderWidth: 0.5,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  picker: {
    borderWidth: 0.5,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  radioContainer: {
    marginBottom: 10,
  },
  radioGroup: {
    marginBottom: 10,
  },
  startBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  startBtnText: {
    color: 'white',
    fontSize: 20,
    marginLeft: 10,
  }
})

export default RegModal
