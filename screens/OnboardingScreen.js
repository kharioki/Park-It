import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper'

const { width } = Dimensions.get('window')

const OnboardingScreen = ({ navigation }) => {

  const Skip = ({ ...props }) => (
    <TouchableOpacity {...props} style={{ marginHorizontal: 8 }}>
      <Text style={styles.controls}>Skip</Text>
    </TouchableOpacity>
  );

  const Next = ({ ...props }) => (
    <TouchableOpacity {...props} style={{ marginHorizontal: 8 }}>
      <Text style={styles.controls}>Next</Text>
    </TouchableOpacity>
  );

  const Done = ({ ...props }) => (
    <TouchableOpacity {...props} style={{ marginHorizontal: 8 }}>
      <Text style={styles.controls}>Get Started</Text>
    </TouchableOpacity>
  );

  const Dots = ({ selected }) => {
    let backgroundColor;
    backgroundColor = selected ? '#0db665' : '#888';
    return (
      <View style={[styles.dots, { backgroundColor }]} />
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Onboarding
        SkipButtonComponent={Skip}
        NextButtonComponent={Next}
        DoneButtonComponent={Done}
        DotComponent={Dots}
        onSkip={() => navigation.replace('Connect')}
        onDone={() => navigation.navigate('Connect')}
        titleStyles={styles.title}
        subTitleStyles={styles.subTitle}
        pages={[
          {
            backgroundColor: '#fff',
            image: <Image source={require('../assets/images/city.png')} style={styles.image} />,
            title: 'Welcome to ParkIt',
            subtitle: 'The first decentralized on-demand service app!',
          },
          {
            backgroundColor: '#fff',
            image: <Image source={require('../assets/images/car.png')} style={styles.image} />,
            title: 'Parking',
            subtitle: 'Find convenient and secure parking spaces in any city',
          },
          // {
          //   backgroundColor: '#fff',
          //   image: <Image source={require('../assets/images/map.png')} style={styles.image} />,
          //   title: 'Navigation',
          //   subtitle: 'Easy navigation, long and short-term parking too',
          // },
          {
            backgroundColor: '#fff',
            image: <Image source={require('../assets/images/secure.png')} style={styles.image} />,
            title: 'Secure',
            subtitle: 'Enjoy services like CCTV surveilance, round the clock security, charging and even Car wash.',
          },
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: width - 40,
    marginHorizontal: 20,
    resizeMode: 'contain',
  },
  controls: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    letterSpacing: 1,
  },
  dots: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 3,
  },
  title: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 24,
    letterSpacing: 1,
  },
  subTitle: {
    color: '#888',
    fontSize: 18,
  },
});

export default OnboardingScreen
