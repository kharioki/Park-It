import React, { useState, useRef, useEffect } from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {
  View, Text, TextInput, Animated, TouchableOpacity, Platform, StyleSheet, Dimensions, _ScrollView
} from 'react-native'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

import { markers, mapStandardStyle, categories } from '../utils/mapData';
import { ScrollView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');
const CARD_HEIGHT = 200;
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
      <View style={styles.topWrapper}>
        <View style={styles.top}>
          <Ionicons.Button
            name="ios-menu"
            size={30}
            color="#fff"
            backgroundColor="#00000020"
            onPress={() => navigation.openDrawer()} />
          <Ionicons.Button
            name="md-navigate-outline"
            size={30}
            color="#fff"
            backgroundColor="#00000020"
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
      <View style={styles.bottomWrapper}>
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
              <TouchableOpacity key={index} style={styles.chip}>
                <MaterialCommunityIcons style={styles.chipIcon} name={category.icon} size={20} color="#888" />
                <Text style={styles.chipText}>{category.name}</Text>
              </TouchableOpacity>
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
              <View style={styles.card} key={index}>
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
                      value={marker.available_spots}
                      disabled={true}
                    />
                    <Text style={styles.sliderDescription}>{marker.available_spots} out of {marker.total_spots}</Text>
                  </View>
                </View>
                <View style={styles.cardFooter}>
                  <Text style={styles.cardFooterText}>Services available:</Text>
                  <View style={styles.cardFooterServices}>
                    {marker.services.map((service, index) => (
                      <Text key={index} style={styles.servicesText}>
                        {service}
                      </Text>
                    ))}
                  </View>
                </View>
              </View>
            ))}
          </Animated.ScrollView>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>GO</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topWrapper: {
    position: 'absolute',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    width: width,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 10,
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
  chipsScrollView: {
    top: Platform.OS === 'ios' ? 20 : 30,
    paddingHorizontal: 10,
  },
  chipIcon: {
    marginRight: 5,
  },
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
  bottomWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
  },
  scrollView: {
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: '#FFF',
    borderRadius: 5,
    marginRight: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
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
    borderBottomWidth: 1,
  },
  cardTitle: {
    fontSize: 24,
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
    paddingVertical: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
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
    paddingBottom: 10,
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
    fontWeight: '500',
    letterSpacing: 1,
  },
})

export default HomeScreen
