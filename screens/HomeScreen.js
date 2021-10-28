import React, { useState, useRef, useEffect, useContext } from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {
  View, Animated, Platform, StyleSheet, Dimensions, ScrollView, Text
} from 'react-native'
import { Ionicons, Entypo } from '@expo/vector-icons';

import { markers, mapStandardStyle, categories } from '../utils/mapData';
import Header from '../components/Header';
import Chip from '../components/Chip';
import ParkingCard from '../components/ParkingCard';
import Button from '../components/Button';

import { AuthContext } from '../navigation/AuthProvider';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;


const HomeScreen = (props) => {
  const { navigation } = props;
  const initialMapState = {
    markers,
    region: {
      latitude: 22.62938671242907,
      longitude: 88.4354486029795,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068,
    }
  }

  const [mapState, setMapState] = useState(initialMapState);
  const [selectedSession, setSelectedSession] = useState(null);

  const { session, startSession } = useContext(AuthContext);

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= mapState.markers.length) {
        index = mapState.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { coordinate } = mapState.markers[index];
          _map.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: mapState.region.latitudeDelta,
              longitudeDelta: mapState.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  }, []);

  const interpolations = mapState.markers.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp",
    });

    return { scale };
  });

  const onMarkerPress = mapEventData => {
    const markerId = mapEventData._targetInst.return.key;

    let x = markerId * CARD_WIDTH + markerId * 20
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({ x, y: 0, animated: true });
  };

  const _map = useRef(null);
  const _scrollView = useRef(null);

  console.log(selectedSession)

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
      <Header drawerOpen={() => navigation.openDrawer()} iconName="md-navigate-outline" />
      <View style={styles.bottomWrapper}>
        {!session.isActive && selectedSession === null &&
          <View>
            <ScrollView
              horizontal
              scrollEventThrottle={1}
              showsHorizontalScrollIndicator={false}
              height={50}
              style={styles.chipsScrollView}
              contentInset={{
                // ios only
                top: 0,
                left: 0,
                bottom: 0,
                right: 20,
              }}
              contentContainerStyle={{
                // for android
                paddingRight: Platform.OS === 'android' ? 20 : 0,
              }}>
              {categories.map((category, index) => (
                <Chip key={index} category={category} />
              ))}
            </ScrollView>
            <Animated.ScrollView
              horizontal
              ref={_scrollView}
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={1}
              snapToInterval={CARD_WIDTH + 20}
              style={styles.scrollView}
              pagingEnabled
              snapToAlignment="center"
              contentInset={{
                // ios only
                top: 0,
                left: SPACING_FOR_CARD_INSET,
                bottom: 0,
                right: SPACING_FOR_CARD_INSET,
              }}
              contentContainerStyle={{
                paddingHorizontal:
                  Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0,
              }}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        x: mapAnimation,
                      },
                    },
                  },
                ],
                { useNativeDriver: true }
              )}>
              {mapState.markers.map((marker, index) => (
                <ParkingCard key={index} marker={marker} />
              ))}
            </Animated.ScrollView>

            <Button text="Go" onPress={() => setSelectedSession(markers[0])} />
          </View>
        }
        {selectedSession &&
          <View style={styles.startSessionWrapper}>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => setSelectedSession(null)}>
              <Ionicons name="md-close" size={30} color="red" />
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity styles={styles.infoBtn} onPress={() => { }}>
              <Entypo name="info" size={30} color="#0db665" />
              <Text style={styles.infoBtnText}>Info</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.startBtn} onPress={() => startSession}>
              <Text style={styles.startBtnText}>Start Session</Text>
            </TouchableOpacity>
          </View>
        }
      </View>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chipsScrollView: {
    top: Platform.OS === 'ios' ? 20 : 30,
    paddingHorizontal: 10,
  },
  bottomWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    // padding: 10,
  },
  scrollView: {
    paddingVertical: 10,
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
  button: {
    width: width - 40,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0db665',
    marginBottom: 10,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    alignItems: 'center',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  startSessionWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 10,
  },
  cancelBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#fff',
    height: 60,
    alignItems: 'center',
  },
  cancelBtnText: {
    fontSize: 18,
    color: 'red',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  infoBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    height: 60,
    alignItems: 'center',
  },
  infoBtnText: {
    fontSize: 18,
    color: '#0db665',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  startBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#0db665',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startBtnText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
})

export default HomeScreen
