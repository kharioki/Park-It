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
    height: 120,
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardNumber: {
    fontSize: 30,
    fontWeight: '200',
    color: '#0db665',
  },
  cardText: {
    fontSize: 14,
    color: '#777',
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
  },
})

export default StatsCard
