import React, { useState, useRef } from 'react'
import { View, Animated, StyleSheet } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import { mapStandardStyle } from '../utils/mapData';

const Map = ({ mapState, onMarkerPress, interpolations }) => {
  const _map = useRef(null);

  return (
    <View style={styles.container}>
      <MapView
        ref={_map}
        provider={PROVIDER_GOOGLE}
        style={styles.container}
        initialRegion={mapState.region}
        customMapStyle={mapStandardStyle}>
        {mapState.markers.map((marker, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };

          return (
            <MapView.Marker
              key={index}
              coordinate={marker.coordinate}
              onPress={onMarkerPress}>
              <Animated.View style={[styles.markerWrap]}>
                <Animated.Image
                  source={require('../assets/icons/parking-128.png')}
                  style={[styles.marker, scaleStyle]}
                  resizeMode="cover"
                />
              </Animated.View>
            </MapView.Marker>
          );
        })}
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
})

export default Map
