import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Modal } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const ConfirmModal = ({ visible, onHideConfirmModal, regNumber, confirmEndSession }) => {
  return (
    <Modal visible={visible} onDismiss={onHideConfirmModal} contentContainerStyle={styles.modalContainer}>
      <View>
        <Text style={styles.text}>Do you want to end this parking session for vehicle: {regNumber}</Text>
        <View style={styles.optionsRow}>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: '#fff' }]}
            onPress={() => onHideConfirmModal()}>
            <MaterialCommunityIcons name="window-close" size={24} color="red" />
            <Text style={[styles.btnText, { color: 'red' }]}>Not Yet</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: '#0db665' }]}
            onPress={() => confirmEndSession()}>
            <MaterialCommunityIcons name="check-bold" size={24} color="white" />
            <Text style={[styles.btnText, { color: '#fff' }]}>Yeah Sure</Text>
          </TouchableOpacity>
        </View>
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
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  btnText: {
    fontSize: 20,
    marginLeft: 10,
  }
})

export default ConfirmModal
