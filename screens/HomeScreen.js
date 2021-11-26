import React, { useState, useRef, useEffect, useContext } from 'react'
import { View, Animated, Platform, StyleSheet, Dimensions, ScrollView } from 'react-native'

import { AuthContext } from '../navigation/AuthProvider';
import { markers, categories } from '../utils/mapData';

import Header from '../components/Header';
import Chip from '../components/Chip';
import ParkingCard from '../components/ParkingCard';
import RegModal from '../components/RegModal';
import ConfirmModal from '../components/ConfirmModal';
import ListView from '../components/ListView';
import Map from '../components/Map';
import PaySession from '../components/wrappers/PaySession';
import EndSession from '../components/wrappers/EndSession';
import StartSession from '../components/wrappers/StartSession';

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

  const onSelectLot = (lot) => {
    const selectedMarkers = markers.filter(marker => marker.id === lot.id);
    const selectedRegion = {
      latitude: lot.coordinate.latitude,
      longitude: lot.coordinate.longitude,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068,
    }
    let _state = {
      markers: selectedMarkers,
      region: selectedRegion
    }
    setMapState(_state);
  }

  const onClear = () => {
    setMapState(initialMapState);
  }


  const handleSelect = (lot) => {
    onSelectLot(lot);
    setSelectedSession(lot);
  }

  const clearSelection = () => {
    onClear();
    setSelectedSession(null);
  }

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const showConfirmModal = () => setConfirmModalVisible(true);
  const hideConfirmModal = () => setConfirmModalVisible(false);

  const handleEndSession = () => {
    onClear();
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
        <ListView
          mapState={mapState}
          handleSelect={handleSelect}
          selected={selectedSession}
        />
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
                <ParkingCard
                  key={index}
                  marker={marker}
                  selected={selectedSession}
                  onPress={() => handleSelect(marker)} />
              ))}
            </Animated.ScrollView>
          </View>
        }

        {selectedSession && !session.isActive &&
          <StartSession
            clear={clearSelection}
            showDetails={() => navigation.navigate('Details')}
            showModal={showModal}
          />
        }

        {session.isActive && selectedSession && !sessionEnded &&
          <EndSession showConfirmModal={showConfirmModal} />
        }

        {sessionEnded && <PaySession handleEndSession={handleEndSession} />}

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
})

export default HomeScreen
