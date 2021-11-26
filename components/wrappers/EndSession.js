import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Button from '../Button'

const EndSession = ({ showConfirmModal }) => {
  return (
    <View style={styles.endSessionWrapper}>
      <View style={styles.sessionContainer}>
        <View style={styles.sessionInfo}>
          <Text style={styles.activeSessionText}>You have an active parking session: </Text>
          <Text style={styles.activeSessionTime}>4hr 25mins</Text>
        </View>
      </View>
      <Button text="End Session" onPress={() => showConfirmModal()} isClear />
    </View>
  )
}

const styles = StyleSheet.create({
  endSessionWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: '#0db665',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    bottom: 0,
  },
  sessionContainer: {
    width: '90%',
    alignItems: 'center',
    padding: 10,
  },
  sessionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activeSessionText: {
    fontSize: 14,
    color: '#fff',
    backgroundColor: '#0db665',
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  activeSessionTime: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0db665',
    backgroundColor: '#fff',
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
})

export default EndSession
