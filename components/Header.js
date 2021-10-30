import React from 'react'
import { View, TextInput, StyleSheet, Dimensions, Platform, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const { width } = Dimensions.get('window');

const Header = ({ drawerOpen, iconName, hasActiveSession, selected, hasEnded }) => {
  return (
    <View style={styles.topWrapper}>
      <View style={styles.top}>
        <Ionicons.Button
          name="ios-menu"
          size={30}
          color="#000"
          backgroundColor="#ccc"
          onPress={drawerOpen} />
        <Ionicons.Button
          name={iconName}
          size={30}
          color="#000"
          backgroundColor="#ccc"
          onPress={() => { }} />
      </View>
      <View style={styles.searchBox}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search here"
          placeholderTextColor="#999"
          autoCapitalize="none"
          autoCorrect={false}
          value={selected?.name}
          disabled={hasActiveSession || hasEnded}
        />
        <Ionicons name="ios-search" size={20} color="#999" />
      </View>

      {hasActiveSession && selected && !hasEnded && (
        <View style={styles.sessionContainer}>
          <View style={styles.sessionInfo}>
            <Text style={styles.activeSessionText}>You have an active parking session: </Text>
            <Text style={styles.activeSessionTime}>4hr 25mins</Text>
          </View>
        </View>
      )}
      {hasEnded && (
        <View style={styles.sessionContainer}>
          <View style={styles.sessionInfo}>
            <Text style={styles.activeSessionText}>Session ended: Total time</Text>
            <Text style={styles.activeSessionTime}>8hrs 13mins</Text>
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  topWrapper: {
    position: 'absolute',
    width: width,
    backgroundColor: '#79797920',
    alignSelf: 'center',
  },
  top: {
    marginTop: Platform.OS === 'ios' ? 30 : 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchBox: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  sessionContainer: {
    width: '90%',
    alignSelf: 'center',
    // marginTop: 10,
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
})

export default Header
