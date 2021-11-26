import React from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableHighlight } from 'react-native'
import Slider from '@react-native-community/slider';

const { width } = Dimensions.get('window');
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.9;

const ParkingCard = ({ marker, onPress, selected }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{marker.price_per_day}/day</Text>
        <View style={styles.cardRight}>
          <Text style={styles.cardSubtitle}>{marker.name}</Text>
          <Text style={styles.cardCaption}>{marker.location}</Text>
        </View>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.cardDescription}>available spots:</Text>
        <View style={styles.cardSlider}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={marker.total_spots}
            minimumTrackTintColor="#0db665"
            maximumTrackTintColor="#999"
            thumbTintColor="#0db665"
            value={marker.total_spots - marker.available_spots}
            disabled={true}
          />
          <Text style={styles.sliderDescription}>{marker.available_spots} out of {marker.total_spots}</Text>
        </View>
      </View>
      <View style={styles.cardFooter}>
        <Text style={styles.cardFooterText}>Services:</Text>
        <View style={styles.cardFooterServices}>
          {marker.services.map((service, index) => (
            <Text key={index} style={styles.servicesText}>
              {service}
            </Text>
          ))}
        </View>
      </View>

      <TouchableHighlight
        style={styles.cardButton}
        activeOpacity={0.6}
        underlayColor="#0db66530"
        onPress={onPress}
        disabled={selected?.id === marker.id}
      >
        <Text style={styles.cardButtonText}>SELECT LOT</Text>
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 10,
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  cardSubtitle: {
    fontSize: 18,
    color: '#333',
    textAlign: 'right',
  },
  cardCaption: {
    fontSize: 14,
    color: '#999',
    textAlign: 'right',
  },
  cardBody: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#333',
  },
  cardSlider: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  slider: {
    marginTop: 10,
    marginBottom: 6,
    width: CARD_WIDTH * 0.5,
    height: 8,
  },
  sliderDescription: {
    fontSize: 14,
    color: '#0db665',
    fontWeight: 'bold',
    textAlign: 'right',
  },
  cardFooter: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  cardFooterText: {
    fontSize: 14,
    color: '#333',
  },
  cardFooterServices: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  servicesText: {
    fontSize: 14,
    color: '#777',
  },
  cardButton: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    height: 40,
  },
  cardButtonText: {
    color: '#0db665',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  }
})

export default ParkingCard
