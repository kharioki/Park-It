import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { Modal, Searchbar, Button } from 'react-native-paper'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location'

import { mapStandardStyle } from '../utils/mapData';
import { GOOGLE_PLACES_API_KEY } from '../config';

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
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

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

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setCoordinates({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      })
    })();
  }, []);

  console.log(location);

  return (
    <Modal visible={visible} onDismiss={onHideMapModal} contentContainerStyle={styles.modalContainer}>
      <View>
        <Text style={styles.text}>Search location and drop pin:</Text>
        <View style={styles.searchContainer}>
          <GooglePlacesAutocomplete
            placeholder='Enter Location'
            minLength={2}
            // autoFocus={true}
            // returnKeyType={'default'}
            fetchDetails={true}
            query={{
              key: GOOGLE_PLACES_API_KEY,
              language: 'en', // language of the results
            }}
            onPress={(data, details = null) => console.log(data)}
            onFail={(error) => console.error(error)}
            // requestUrl={{
            //   url:
            //     'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
            //   useOnPlatform: 'web',
            // }} // this in only required for use on the web. See https://git.io/JflFv more for details.
            styles={{
              textInputContainer: {
                backgroundColor: 'grey',
              },
              textInput: {
                height: 38,
                color: '#5d5d5d',
                fontSize: 16,
              },
              predefinedPlacesDescription: {
                color: '#1faadb',
              },
            }}
            currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
          />
        </View>

        {/* <Searchbar
          placeholder="Search location"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchbar}
        /> */}
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
  searchContainer: {
    marginBottom: 10,
  },
  searchbar: {
    margin: 10,
  },
  mapContainer: {
    marginTop: 30,
    width: '100%',
    height: 300,
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
