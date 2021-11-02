import React, { useContext } from 'react'
import { SafeAreaView, View, Text, StyleSheet, TouchableHighlight, Dimensions } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { AuthContext } from '../navigation/AuthProvider'

const { width } = Dimensions.get('window')

const SelectUserTypeScreen = () => {
  const { userType, setUserType } = useContext(AuthContext)
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Select User</Text>
        <Text style={styles.subtitle}>
          At this point, if you have a space/lot to rent out, you may select 'Parking lot owner',
          if you are a driver, you may select 'Lot User'.
        </Text>
        <View style={styles.userWrapper}>
          <TouchableHighlight
            activeOpacity={0.2}
            underlayColor="#0db66530"
            style={styles.userButton}
            onPress={() => setUserType('owner')}>
            <>
              <View style={styles.userContainer}>
                <MaterialCommunityIcons name="parking" size={100} color="#0db665" />
              </View>
              <Text style={styles.userText}>Parking Lot Owner</Text>
            </>
          </TouchableHighlight>
          <TouchableHighlight
            activeOpacity={0.2}
            underlayColor="#0db66530"
            style={styles.userButton}
            onPress={() => setUserType('driver')}>
            <>
              <View style={styles.userContainer}>
                <MaterialCommunityIcons name="car-multiple" size={100} color="#0db665" />
              </View>
              <Text style={styles.userText}>Parking Lot User</Text>
            </>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  title: {
    fontSize: 20,
    color: '#888',
    fontWeight: 'bold',
    marginBottom: 20,
    letterSpacing: 1,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
    letterSpacing: 1,
    textAlign: 'center',
    lineHeight: 25,
  },
  userWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.8,
    paddingHorizontal: 20,
    marginTop: 20
  },
  userButton: {
    paddingVertical: 10,
  },
  userContainer: {
    width: width * 0.45 - 40,
    height: width * 0.45 - 40,
    borderRadius: width / 4,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    shadowColor: '#0db665',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.34,
  },
  userText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    color: '#0db665',
    letterSpacing: 1
  }
})

export default SelectUserTypeScreen
