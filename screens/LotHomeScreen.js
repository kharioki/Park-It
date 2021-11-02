import React from 'react'
import { SafeAreaView, View, Text, StyleSheet, Dimensions } from 'react-native'
import OwnerStack from '../navigation/OwnerStack'

const { width, height } = Dimensions.get('window')

const LotHomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Lot Home Screen</Text>
      </View>
      <View style={styles.bodyWrapper}>
        <View style={styles.card}>
          <Text style={styles.cardNumber}>2</Text>
          <Text style={styles.cardText}>Lots added</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardNumber}>28</Text>
          <Text style={styles.cardText}>Active sessions</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0db665',
  },
  bodyWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#0db66510',
    width: width / 2 - 40,
    height: 120,
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardNumber: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#888',
  },
  cardText: {
    fontSize: 20,
    color: '#888',
  },
})

export default LotHomeScreen
