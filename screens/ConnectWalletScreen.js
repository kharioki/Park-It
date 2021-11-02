import React, { useState } from 'react'
import { SafeAreaView, View, Text, StyleSheet, ActivityIndicator, Image, Dimensions } from 'react-native'

import Button from '../components/Button'

const { width } = Dimensions.get('window')

const ConnectWalletScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false)

  //TODO: save wallet address to local storage

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Image source={require('../assets/bg/celo-net.png')} style={styles.image} />
        <View style={styles.textWrapper}>
          <Text style={styles.title}>One more thing</Text>
          <Text style={styles.text}>
            Park-IT uses the Celo blockchain protocol to handle app transactions smoothly.
            To proceed please connect to a Celo wallet.
          </Text>
        </View>
      </View>

      <ActivityIndicator
        animating={isLoading}
        size="large"
        color="#0db665"
        style={styles.activityIndicator}
      />

      <Button text="Connect Wallet" onPress={() => navigation.replace('SelectUserType')} />

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff'
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  image: {
    height: 300,
    width: width - 40,
    marginHorizontal: 20,
    marginBottom: 20,
    resizeMode: 'cover',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#0db66550'
  },
  textWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    color: '#0db665'
  },
  text: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    lineHeight: 25
  },
  activityIndicator: {
    marginBottom: 20
  }
})

export default ConnectWalletScreen
