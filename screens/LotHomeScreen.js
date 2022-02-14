import React from 'react'
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native'
import { Button } from 'react-native-paper';

import { activeSessions } from '../utils/sampleData'
import RowCard from '../components/RowCard'
import StatsCard from '../components/StatsCard'

const { width } = Dimensions.get('window')

const LotHomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button
          icon='parking'
          mode="contained"
          color={"#0db665"}
          style={styles.button}
          onPress={() => navigation.navigate('Create')}>
          Add a Parking Lot
        </Button>
      </View>
      <View style={styles.subHeader}>
        <Text style={styles.subHeaderText}>Summary</Text>
      </View>
      <View style={styles.bodyRow}>
        <StatsCard value={1} text="Lot Added" />
        <StatsCard value={28} text="Active Sessions" />
      </View>
      <View style={styles.bodyRow}>
        <StatsCard value={400} text="Completed Sessions" />
        <StatsCard value={'28K'} text="Total Paid" />
      </View>
      <View style={styles.subHeader}>
        <Text style={styles.subHeaderText}>Active Sessions</Text>
      </View>
      <View style={styles.scrollWrapper}>
        <ScrollView >
          {activeSessions.map((session, index) => (
            <RowCard key={index} {...session} />
          ))}
        </ScrollView>
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
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  bodyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  button: {
    width: width * 0.6,
    borderRadius: 25,
  },
  subHeader: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  subHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0db665',
    letterSpacing: 1,
  },
  scrollWrapper: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#0db665',
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
})

export default LotHomeScreen
