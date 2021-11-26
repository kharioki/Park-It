import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

const StatsCard = ({ value, text }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardNumber}>{value}</Text>
      <Text style={styles.cardText}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#0db66510',
    width: width / 2 - 30,
    height: 80,
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardNumber: {
    fontSize: 20,
    fontWeight: '500',
    color: '#0db665',
  },
  cardText: {
    fontSize: 14,
    color: '#777',
    fontWeight: '200',
    textAlign: 'center',
    letterSpacing: 1,
  },
})

export default StatsCard
