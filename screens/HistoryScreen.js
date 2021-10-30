import React from 'react'
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'

const completedSessions = [
  {
    name: 'Sarit Level 1',
    location: 'Sarit, Westlands',
    date: '12/10/2021',
    cost: 200,
    from: '12:00',
    to: '13:00',
    duration: '1 hour',
    status: 'Completed',
    rating: 4.5,
    extras: ['Car wash'],
  },
  {
    name: 'Sarit Level 2',
    location: 'Sarit, Westlands',
    date: '13/10/2021',
    cost: 200,
    from: '08:00',
    to: '18:00',
    duration: '10 hours',
    status: 'Completed',
    rating: 4.5,
    extras: ['Car wash'],
  },
];

const HistoryScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.titleHeader}>
          <Text style={styles.title}>{completedSessions.length} Completed Sessions</Text>
        </View>
        <ScrollView style={styles.scrollView}>
          {completedSessions.map((session, index) => (
            <View key={index} style={styles.session}>
              <View style={styles.sessionHeader}>
                <View style={styles.headerLeft}>
                  <View style={styles.leftTop}>
                    <Text style={styles.sessionName}>{session.name}</Text>
                    <Text style={styles.completed}>{session.status}</Text>
                  </View>
                  <Text style={styles.sessionLocation}>{session.location}</Text>
                </View>
                <Text style={styles.text}>{session.date}</Text>
              </View>
              <View style={styles.sessionRow}>
                <Text style={styles.text}>{session.from} - {session.to}</Text>
                <Text style={styles.text}>KES {session.cost}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  titleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0db665',
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
  completed: {
    fontSize: 14,
    color: '#fff',
    backgroundColor: 'red',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
    marginLeft: 10,
  },
  sessionLocation: {
    fontSize: 14,
    color: '#777',
  },
  headerRight: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 14,
    color: '#777',
  },
  sessionBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  sessionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
})

export default HistoryScreen
