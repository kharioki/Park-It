import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const Chip = ({ category }) => {
  return (
    <TouchableOpacity style={styles.chip}>
      <MaterialCommunityIcons style={styles.chipIcon} name={category.icon} size={20} color="#888" />
      <Text style={styles.chipText}>{category.name}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  chipIcon: {
    marginRight: 5,
  },
  chipText: {
    fontSize: 16,
  },
})

export default Chip
