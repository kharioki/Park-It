import React, { useState } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { Modal, Searchbar, Button } from 'react-native-paper'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import { mapStandardStyle } from '../utils/mapData';

const initialMapState = {
  region: {
    latitude: 22.62938671242907,
    longitude: 88.4354486029795,
    latitudeDelta: 0.04864195044303443,
    longitudeDelta: 0.040142817690068,
  }
}

const MapModal = ({ visible, onHideMapModal, onSetCordinate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mapState, setMapState] = useState(initialMapState);
  const [coordinates, setCoordinates] = useState({
    latitude: 37.78825,
    longitude: -122.4324
  })

  const onChangeSearch = query => setSearchQuery(query);

  const handleChangeCordinates = (latitude, longitude) => {
    setCoordinates({
      latitude,
      longitude
    })
  }

  const handleSetCordinate = () => {
    onSetCordinate(coordinates);
    onHideMapModal();
  }

  return (
    <Modal visible={visible} onDismiss={onHideMapModal} contentContainerStyle={styles.modalContainer}>
      <View>
        <Text style={styles.text}>Search location and drop pin:</Text>
        <Searchbar
          placeholder="Search location"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchbar}
        />
        <View style={styles.mapContainer}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            customMapStyle={mapStandardStyle}
            initialRegion={mapState.region}
            onPress={(e) => {
              console.log(e.nativeEvent.coordinate)
              handleChangeCordinates(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude)
            }}>
            <MapView.Marker
              coordinate={coordinates}
              draggable>
              <View style={[styles.markerWrap]}>
                <Image
                  source={require('../assets/icons/parking-128.png')}
                  style={[styles.marker]}
                  resizeMode="cover"
                />
              </View>
            </MapView.Marker>
          </MapView>
        </View>
        <Button
          style={styles.button}
          mode="contained"
          onPress={handleSetCordinate}>
          Select location
        </Button>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  text: {
    fontSize: 16,
    color: '#888',
    marginHorizontal: 10,
    lineHeight: 20,
  },
  searchbar: {
    margin: 10,
  },
  mapContainer: {
    width: '100%',
    height: 400,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  button: {
    marginTop: 10,
    marginHorizontal: 20,
    backgroundColor: '#0db665',
    height: 50,
    justifyContent: 'center',
  },
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    width: 50,
    height: 50,
  }
})

export default MapModal
