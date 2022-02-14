import React, { useState, useContext, useEffect } from 'react'
import { SafeAreaView, View, Text, StyleSheet, ActivityIndicator, Image, Dimensions } from 'react-native'
import { requestAccountAddress, waitForAccountAuth } from "@celo/dappkit";
import * as Linking from 'expo-linking';
import Web3 from 'web3'
import { newKitFromWeb3 } from "@celo/contractkit";

import { AuthContext } from '../navigation/AuthProvider';

import Button from '../components/Button'

const provider = "https://alfajores-forno.celo-testnet.org"
// const web3 = new Web3("https://celo-alfajores--rpc.datahub.figment.io/apikey/e458b503c6670c21ede193b1d00cc774/");


const web3 = new Web3(provider);
const kit = newKitFromWeb3(web3);

const { width } = Dimensions.get('window')

const ConnectWalletScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false)
  const { address, setAddress, phoneNumber, setPhoneNumber, balance, setBalance } = useContext(AuthContext)

  //TODO: save wallet address to local storage
  const connectWallet = async () => {
    console.log("entering login")

    const requestId = 'login';
    const dappName = 'Park It';
    const callback = Linking.makeUrl('select-user-type');

    requestAccountAddress({
      requestId,
      dappName,
      callback
    })
    // Wait for the Celo Wallet response
    try {
      const dappkitRes = await waitForAccountAuth(requestId)
      console.log('waiting for account auth', dappkitRes);
      setAddress(dappkitRes.address);
      setPhoneNumber(dappkitRes.phoneNumber)

      kit.defaultAccount = dappkitRes.address;
      console.log("kit.defaultAccount", kit.defaultAccount)

      const accounts = await kit.web3.eth.getAccounts();
      console.log('accounts', accounts);
      const _address = accounts[0];
      console.log('_address', _address);

      // Get the stabel token contract
      const stableToken = await kit.contracts.getStableToken()

      // Get the user account balance (cUSD)
      const cUSDBalanceBig = await stableToken.balanceOf(kit.defaultAccount)

      // Convert from a big number to a string by rounding it to the appropriate number of decimal places
      const ERC20_DECIMALS = 18
      let cUSDBalanceDec = cUSDBalanceBig.shiftedBy(-ERC20_DECIMALS).toFixed(2)
      let cUSDBalance = cUSDBalanceDec.toString()
      setBalance(cUSDBalance)

      if (dappkitRes.address === '') {
        console.log("no address")
      } else {
        console.log("address", dappkitRes.address)
        navigation.replace('SelectUserType')
      }

    } catch (error) {
      console.log('error', error);
      setStatus("Login timed out, try again.")
    }


  }

  const goToApp = () => {
    console.log("entering signin")
    navigation.replace('SelectUserType')
  }

  useEffect(() => {
    if (address) {
      goToApp()
    }
  }, [address])

  console.log("address", address)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Image source={require('../assets/bg/celo-net.png')} style={styles.image} />
        <View style={styles.textWrapper}>
          <Text style={styles.title}>One more thing</Text>
          <Text style={styles.text}>
            Park-IT uses the Celo blockchain protocol to handle app transactions smoothly.
            To proceed please connect to a Valora Celo wallet.
          </Text>
        </View>
      </View>

      <ActivityIndicator
        animating={isLoading}
        size="large"
        color="#0db665"
        style={styles.activityIndicator}
      />

      <Button text="Connect Wallet" onPress={() => connectWallet()} />

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
