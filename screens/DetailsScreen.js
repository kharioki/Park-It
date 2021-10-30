import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import Button from '../components/Button'

const DetailsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Details Screen</Text>
        <Ionicons.Button
          name="ios-close"
          size={30}
          color="#888"
          backgroundColor="transparent"
          onPress={() => navigation.goBack()} />
      </View>
      <ScrollView style={styles.body}>
        <View style={styles.sessionContent}>
          <View style={styles.contentRow}>
            <View style={styles.leftItem}>
              <Text style={styles.nameText}>Session Name</Text>
              <Text style={styles.locationText}>Session Location</Text>
            </View>
            <View style={styles.rightItem}>
              <Text style={styles.costText}>500 / day</Text>
            </View>
          </View>
          <View style={styles.contentRow}>
            <Text style={styles.text}>Open at: </Text>
            <Text style={styles.time}>10:00 AM - 10:00 PM</Text>
          </View>
          <View style={styles.contentRow}>
            <Text style={styles.text}>Total parking slots: </Text>
            <Text style={styles.time}>120</Text>
          </View>
          <View style={styles.contentRow}>
            <Text style={styles.text}>Slots available now: </Text>
            <Text style={styles.time}>80</Text>
          </View>
        </View>

        <View style={styles.sessionContent}>
          <Text style={styles.title}>Parking available for:</Text>
          <View style={styles.contentRow}>
            <View style={styles.row}>
              <Ionicons name="ios-car" size={24} color="#0db665" style={{ marginRight: 5 }} />
              <Text style={styles.text}>Sedan / Suv / Saloon / Coupe</Text>
            </View>
            <View style={styles.check}>
              <Ionicons name="ios-checkmark" size={16} color="#0db665" />
            </View>
          </View>
          <View style={styles.contentRow}>
            <View style={styles.row}>
              <MaterialCommunityIcons name="motorbike" size={24} color="#0db665" style={{ marginRight: 5 }} />
              <Text style={styles.text}>Motorbike</Text>
            </View>
            <View style={styles.check}>
              <Ionicons name="ios-checkmark" size={16} color="#0db665" />
            </View>
          </View>
          <View style={styles.contentRow}>
            <View style={styles.row}>
              <MaterialCommunityIcons name="bike" size={24} color="#0db665" style={{ marginRight: 5 }} />
              <Text style={styles.text}>Bicycle</Text>
            </View>
            <View style={styles.check}>
              <Ionicons name="ios-checkmark" size={16} color="#0db665" />
            </View>
          </View>
          <View style={styles.contentRow}>
            <View style={styles.row}>
              <MaterialCommunityIcons name="truck" size={24} color="#0db665" style={{ marginRight: 5 }} />
              <Text style={styles.text}>Truck / Van / Bus</Text>
            </View>
            <View style={styles.check}>
              <Ionicons name="ios-checkmark" size={16} color="#0db665" />
            </View>
          </View>
        </View>

        <View style={styles.sessionContent}>
          <Text style={styles.title}>Other Services included:</Text>
          <View style={styles.contentRow}>
            <View style={styles.row}>
              <MaterialCommunityIcons name="cctv" size={24} color="#0db665" style={{ marginRight: 5 }} />
              <Text style={styles.text}>CCTV and security</Text>
            </View>
          </View>
          <View style={styles.contentRow}>
            <View style={styles.row}>
              <MaterialCommunityIcons name="hours-24" size={24} color="#0db665" style={{ marginRight: 5 }} />
              <Text style={styles.text}>24 Hour Services</Text>
            </View>
          </View>
        </View>

        <View style={styles.sessionContent}>
          <Text style={styles.title}>Parking Rules:</Text>
          <Button text="View rules" isClear />
        </View>

        <View style={styles.contentBottom}>
          <Button text="Start Session" />
        </View>
      </ScrollView>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    color: '#0db665',
    marginLeft: 10,
  },
  body: {
    flex: 1,
    paddingHorizontal: 10,
  },
  sessionContent: {
    padding: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },
  contentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  leftItem: {
    flexDirection: 'column',
  },
  nameText: {
    fontSize: 16,
    color: '#333',
  },
  locationText: {
    fontSize: 14,
    color: '#ddd',
  },
  rightItem: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#0db665',
  },
  costText: {
    fontSize: 16,
    color: '#fff',
  },
  text: {
    fontSize: 14,
    color: '#888',
  },
  time: {
    fontSize: 14,
    color: '#0db665',
  },
  title: {
    fontSize: 16,
    color: '#0db665',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  check: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#0db665',
  },
  contentBottom: {
    marginBottom: 10,
  },
})

export default DetailsScreen
