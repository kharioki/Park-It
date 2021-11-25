import React, { useState, useRef, useEffect, useContext } from 'react'
// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {
  View, Animated, Platform, StyleSheet, Dimensions, ScrollView, Text, TouchableOpacity
} from 'react-native'
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

import { markers, mapStandardStyle, categories } from '../utils/mapData';
import Header from '../components/Header';
import Chip from '../components/Chip';
import ParkingCard from '../components/ParkingCard';
import Button from '../components/Button';
import RegModal from '../components/RegModal';
import ConfirmModal from '../components/ConfirmModal';

import { AuthContext } from '../navigation/AuthProvider';
import ListView from '../components/ListView';
import Map from '../components/Map';

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

  const [showMap, setShowMap] = useState(false);
  const [mapState, setMapState] = useState(initialMapState);
  const [selectedSession, setSelectedSession] = useState(null);
  const [sessionEnded, setSessionEnded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [regNumber, setRegNumber] = useState('');
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  const { session, startSession, endSession } = useContext(AuthContext);

  const handleShowMap = () => {
    setShowMap(!showMap);
  }

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const showConfirmModal = () => setConfirmModalVisible(true);
  const hideConfirmModal = () => setConfirmModalVisible(false);

  const handleEndSession = () => {
    setSessionEnded(false);
    setSelectedSession(null);
    setRegNumber('');
    endSession();
  }

  const handleConfirmEndSession = () => {
    setSessionEnded(true);
    setConfirmModalVisible(false);
  }

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
      {showMap ? (
        <Map
          mapState={mapState}
          onMarkerPress={onMarkerPress}
          interpolations={interpolations}
        />
      ) : (
        <ListView mapState={mapState} setSelectedSession={setSelectedSession} />
      )}
      <Header
        drawerOpen={() => navigation.openDrawer()}
        iconName="md-navigate-outline"
        hasActiveSession={session.isActive}
        selected={selectedSession}
        hasEnded={sessionEnded}
        showMap={showMap}
        handleShowMap={handleShowMap}
      />
      <View style={styles.bottomWrapper}>
        {showMap && !session.isActive && selectedSession === null &&
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
                <ParkingCard key={index} marker={marker} onPress={() => setSelectedSession(markers)} />
              ))}
            </Animated.ScrollView>
          </View>
        }

        {selectedSession && !session.isActive &&
          <View style={styles.startSessionWrapper}>
            <TouchableOpacity style={styles.btn} onPress={() => setSelectedSession(null)}>
              <Entypo name="cross" size={30} color="red" />
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Details')}>
              <Entypo name="info" size={30} color="#0db665" />
              <Text style={styles.infoBtnText}>Info</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.startBtn} onPress={() => showModal()}>
              <MaterialCommunityIcons name="car-convertible" size={30} color="#0db665" />
              <Text style={styles.startBtnText}>Start Session</Text>
            </TouchableOpacity>
          </View>
        }

        {session.isActive && selectedSession && !sessionEnded &&
          <View style={styles.endSessionWrapper}>
            <Button text="End Session" onPress={() => showConfirmModal()} isClear />
          </View>
        }

        {sessionEnded &&
          <View style={styles.endSessionWrapper}>
            <View style={styles.summaryCard}>
              <View style={styles.summaryCardHeader}>
                <Text style={styles.totalText}>Total</Text>
                <Text style={styles.totalNumber}>700</Text>
              </View>
              <View style={styles.summaryCardBody}>
                <Text style={styles.summaryText}>Parking</Text>
                <Text style={styles.summaryNumber}>400</Text>
              </View>
              <View style={styles.summaryCardBody}>
                <Text style={styles.summaryText}>Car wash</Text>
                <Text style={styles.summaryNumber}>300</Text>
              </View>
            </View>
            <Button text="Pay Up" onPress={handleEndSession} isClear />
          </View>
        }
      </View>
      <RegModal
        visible={modalVisible}
        onHideModal={hideModal}
        onStartSession={startSession}
        regNumber={regNumber}
        onChangeRegNumber={setRegNumber}
      />

      <ConfirmModal
        visible={confirmModalVisible}
        onHideConfirmModal={hideConfirmModal}
        regNumber={regNumber}
        confirmEndSession={handleConfirmEndSession}
      />
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
    paddingVertical: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: '#0db665',
    bottom: 0,
  },
  btn: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
  },
  cancelBtnText: {
    fontSize: 14,
    color: 'red',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  infoBtnText: {
    fontSize: 14,
    color: '#0db665',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  startBtn: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startBtnText: {
    fontSize: 14,
    color: '#0db665',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  endSessionWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: '#0db665',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    bottom: 0,
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    width: width * 0.9,
  },
  summaryCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  totalNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#0db665',
  },
  summaryCardBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 14,
    letterSpacing: 1,
  },
  summaryNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#333',
  },
})

export default HomeScreen
