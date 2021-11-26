import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import Button from '../Button'

const { width } = Dimensions.get('window');

const PaySession = ({ handleEndSession }) => {
  return (
    <View style={styles.endSessionWrapper}>
      <View style={styles.sessionContainer}>
        <View style={styles.sessionInfo}>
          <Text style={styles.activeSessionText}>Session ended: Total time</Text>
          <Text style={styles.activeSessionTime}>8hrs 13mins</Text>
        </View>
      </View>
      <View style={styles.summaryCard}>
        <View style={styles.summaryCardHeader}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalNumber}>700</Text>
        </View>
        <View style={styles.summaryCardBody}>
          <Text style={styles.summaryText}>Parking</Text>
          <Text style={styles.summaryNumber}>400</Text>
        </View>
        <View style={styles.summaryCardBody}>
          <Text style={styles.summaryText}>Car wash</Text>
          <Text style={styles.summaryNumber}>300</Text>
        </View>
      </View>
      <Button text="Pay Up" onPress={handleEndSession} isClear />
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
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    width: width * 0.9,
  },
  summaryCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  totalNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#0db665',
  },
  summaryCardBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 14,
    letterSpacing: 1,
  },
  summaryNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#333',
  },
})

export default PaySession
