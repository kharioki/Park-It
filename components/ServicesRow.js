import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const vehicleTypes = [
  {
    id: 1,
    name: 'Sedan, SUV, Saloon, Coupe',
    icon: 'car',
  },
  {
    id: 2,
    name: 'Motorbike',
    icon: 'motorbike',
  },
  {
    id: 3,
    name: 'Bicycle',
    icon: 'bike',
  },
  {
    id: 4,
    name: 'Truck, Van, Bus',
    icon: 'truck',
  },
];

const ServicesRow = ({ carType, available }) => {
  const vehicleType = vehicleTypes.find(type => type.id === carType);
  return (
    <View style={styles.contentRow}>
      <View style={styles.row}>
        <MaterialCommunityIcons
          name={vehicleType.icon}
          size={24}
          color="#0db665"
          style={{ marginRight: 5 }}
        />
        <Text style={styles.text}>{vehicleType.name}</Text>
      </View>
      <View style={[styles.check, { borderColor: available ? "#0db665" : "red" }]}>
        <MaterialCommunityIcons
          name={available ? "check" : "window-close"}
          size={16}
          color={available ? "#0db665" : "red"}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  contentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
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
  },
  text: {
    fontSize: 14,
    color: '#888',
  },
})

export default ServicesRow
