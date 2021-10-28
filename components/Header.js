import React from 'react'
import { View, TextInput, StyleSheet, Dimensions, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const { width } = Dimensions.get('window');

const Header = ({ drawerOpen, iconName }) => {
  return (
    <View style={styles.topWrapper}>
      <View style={styles.top}>
        <Ionicons.Button
          name="ios-menu"
          size={30}
          color="#fff"
          backgroundColor="transparent"
          onPress={drawerOpen} />
        <Ionicons.Button
          name={iconName}
          size={30}
          color="#fff"
          backgroundColor="transparent"
          onPress={() => { }} />
      </View>
      <View style={styles.searchBox}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search here"
          placeholderTextColor="#999"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Ionicons name="ios-search" size={20} color="#999" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  topWrapper: {
    position: 'absolute',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    width: width - 10,
    backgroundColor: '#00000030',
    alignSelf: 'center',
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
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
    bottom: -15,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
})

export default Header
