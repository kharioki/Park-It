import React from 'react'
import { View, TextInput, StyleSheet, Dimensions, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Button } from 'react-native-paper';

const { width } = Dimensions.get('window');

const Header = ({ drawerOpen, showMap, handleShowMap, hasActiveSession, selected, hasEnded }) => {
  return (
    <View style={styles.topWrapper}>
      <View style={styles.top}>
        <Ionicons.Button
          name="ios-menu"
          size={30}
          color="#000"
          backgroundColor="transparent"
          onPress={drawerOpen} />
        <Button
          icon={showMap ? 'view-list' : 'map-marker-multiple'}
          mode="contained"
          color={"#0db665"}
          onPress={() => handleShowMap()}
        >
          {showMap ? 'List View' : 'Map View'}
        </Button>
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
        {!hasActiveSession && !selected && !hasEnded && (
          <Ionicons name="ios-search" size={20} color="#999" />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  topWrapper: {
    position: 'absolute',
    width: width,
    backgroundColor: '#79797920',
    alignSelf: 'center',
    paddingBottom: 10,
  },
  top: {
    marginTop: Platform.OS === 'ios' ? 35 : 40,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
})

export default Header
