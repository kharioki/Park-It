import React from 'react'
import {
  View, SafeAreaView, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity
} from 'react-native'

const activeSessions = [
  {
    name: 'Sarit Level 1',
    location: 'Sarit, Westlands',
    price_per_day: 500,
    time: '10:00am - 5:00pm'
  },
];

const { width, height } = Dimensions.get('window');
const ActiveSessions = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.activeWrapper}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Active Sessions</Text>
          <Text style={styles.viewAll}>View All</Text>
        </View>
        <ScrollView style={styles.scrollView}>
          {
            activeSessions.map((session, index) => (
              <View key={index} style={styles.session}>
                <View style={styles.sessionHeader}>
                  <View style={styles.headerLeft}>
                    <View style={styles.leftTop}>
                      <Text style={styles.sessionName}>{session.name}</Text>
                      <Text style={styles.active}>Active</Text>
                    </View>
                    <Text style={styles.sessionLocation}>{session.location}</Text>
                  </View>
                  <View style={styles.headerRight}>
                    <Text style={styles.sessionPrice}>KES {session.price_per_day} / day</Text>
                  </View>
                </View>
                <View style={styles.sessionBody}>
                  <View style={styles.bodyLeft}>
                    <Text style={styles.sessionTime}>Active time: </Text>
                  </View>
                  <View style={styles.bodyRight}>
                    <Text style={styles.sessionTime}>{session.time}</Text>
                  </View>
                </View>

                <View style={styles.sessionFooter}>
                  <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btnText}>End Session</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          }
        </ScrollView>
      </View>
      <View style={styles.completedWrapper}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Active Sessions</Text>
          <Text style={styles.viewAll}>View All</Text>
        </View>
        <Text>Complete Sessions</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  title: {
    fontSize: 14,
    color: '#333',
  },
  viewAll: {
    fontSize: 14,
    color: '#0db665',
  },
  activeWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e2e2',
  },
  completedWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  scrollView: {
    paddingHorizontal: 10,
  },
  session: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
  },
  headerLeft: {
    marginTop: 10,
  },
  leftTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  sessionName: {
    fontSize: 16,
    color: '#333',
  },
  active: {
    fontSize: 12,
    color: '#fff',
    backgroundColor: '#0db665',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
    marginLeft: 5,
  },
  sessionLocation: {
    fontSize: 12,
    color: '#777',
  },
  headerRight: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  sessionPrice: {
    fontSize: 14,
    color: '#0db665',
  },
  sessionBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  bodyLeft: {
    paddingHorizontal: 10,
  },
  sessionTime: {
    fontSize: 14,
    color: '#777',
  },
  bodyRight: {
    paddingHorizontal: 10,
  },
  sessionFooter: {
    paddingVertical: 10,
  },
  btn: {
    backgroundColor: '#0db665',
    width: '90%',
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    alignSelf: 'center',
  },
  btnText: {
    fontSize: 14,
    color: '#fff',
  },
})

export default ActiveSessions
