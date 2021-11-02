import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import moment from 'moment'
import { carTypes } from '../utils/carTypes'

const RowCard = ({ carType, regNumber, lotName, startTime }) => {
  const iconName = carTypes.find(type => type.value === carType).name
  return (
    <View style={styles.scrollCard}>
      <View style={styles.scrollCardIcon}>
        <MaterialCommunityIcons name={iconName} size={30} color="#555" />
      </View>
      <View style={styles.scrollCardText}>
        <Text style={styles.scrollCardTextTitle}>{regNumber}</Text>
        <Text style={styles.scrollCardTextSubtitle}>{lotName}</Text>
      </View>
      <View style={styles.scrollCardText}>
        <Text style={styles.scrollCardTime}>{moment(startTime).fromNow(true)}</Text>
        <Text style={styles.scrollCardTimeSubtitle}>Active time</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  scrollCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#fff',
    marginBottom: 10,
  },
  scrollCardIcon: {
    width: 50,
    height: 50,
    backgroundColor: '#fff9',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollCardText: {
    paddingHorizontal: 10,
  },
  scrollCardTextTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 5,
  },
  scrollCardTextSubtitle: {
    fontSize: 14,
    color: '#666',
    letterSpacing: 1,
  },
  scrollCardTime: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '500',
    letterSpacing: 1,
    textAlign: 'right',
  },
  scrollCardTimeSubtitle: {
    fontSize: 14,
    color: '#555',
    textAlign: 'right',
  },
})

export default RowCard
