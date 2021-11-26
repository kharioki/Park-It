import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

const StartSession = ({ clear, showDetails, showModal }) => {
  return (
    <View style={styles.startSessionWrapper}>
      <TouchableOpacity style={styles.btn} onPress={() => clear()}>
        <Entypo name="cross" size={30} color="red" />
        <Text style={styles.cancelBtnText}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => showDetails()}>
        <Entypo name="info" size={30} color="#0db665" />
        <Text style={styles.infoBtnText}>Info</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.startBtn} onPress={() => showModal()}>
        <MaterialCommunityIcons name="car-convertible" size={30} color="#0db665" />
        <Text style={styles.startBtnText}>Start Session</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  startSessionWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: '#0db665',
    bottom: 0,
  },
  btn: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
  },
  cancelBtnText: {
    fontSize: 14,
    color: 'red',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  infoBtnText: {
    fontSize: 14,
    color: '#0db665',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  startBtn: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startBtnText: {
    fontSize: 14,
    color: '#0db665',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
})

export default StartSession
