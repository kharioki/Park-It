import React, { useState, useRef, useEffect } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Modal,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
} from 'react-native'
import { Countries } from '../utils/countries';

const { width } = Dimensions.get('window')

const PhoneInputScreen = ({ navigation }) => {
  let textInput = useRef(null);
  let defaultCountryCode = '+254'
  let defaultMaskCountry = '720 000 000'

  const [phoneNumber, setPhoneNumber] = useState('')
  const [focusInput, setFocusInput] = useState(false)
  const [dataCountries, setDataCountries] = useState(Countries)
  const [modalVisible, setModalVisible] = useState(false)
  const [countryCode, setCountryCode] = useState(defaultCountryCode)
  const [placeholder, setPlaceholder] = useState(defaultMaskCountry)

  const onShowHidenModal = () => {
    setModalVisible(!modalVisible)
  }

  const onChangePhoneNumber = (text) => {
    setPhoneNumber(text)
  }

  const onPressContinue = () => {
    navigation.navigate('OTPInput')
  };

  const onChangeFocus = () => {
    setFocusInput(true)
  }

  const onChangeBlur = () => {
    setFocusInput(false)
  }

  const onCountryChange = (country) => {
    setCountryCode(country.dialCode)
    setPlaceholder(country.mask)
    onShowHidenModal()
  }

  const filterCountries = (val) => {
    if (val) {
      const countryData = dataCountries.filter(
        obj => obj.en.indexOf(val) > -1 || obj.dialCode.indexOf(val) > -1
      );
      setDataCountries(countryData);
    } else {
      setDataCountries(dataCountries);
    }
  }

  let renderModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={onShowHidenModal}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.modalContainer}>
            <View style={styles.filterInputContainer}>
              <TextInput
                autoFocus={true}
                onChangeText={filterCountries}
                placeholder="Search"
                focusable={true}
                style={styles.filterInput}
              />
            </View>
            <FlatList
              style={{ flex: 1 }}
              data={dataCountries}
              extraData={dataCountries}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableWithoutFeedback onPress={() => onCountryChange(item)}>
                  <View style={styles.countryContainer}>
                    <View style={styles.countryItem}>
                      <Text style={styles.countryName}>{item.en}</Text>
                      <Text style={styles.countryCode}>{item.dialCode}</Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              )}
            />
          </View>
        </SafeAreaView>

        <TouchableOpacity
          onPress={onShowHidenModal}
          style={styles.closeButton}
        >
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </Modal>
    )
  }

  useEffect(() => {
    textInput.focus()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior="padding">
        <Text style={styles.textTitle}>Step 1 of 3</Text>
        <View style={styles.wrapper}>
          <Text style={styles.title}>Enter your phone number</Text>
          <View style={styles.phoneInputStyle}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text style={styles.openDialog}>{countryCode + ' |'}</Text>
            </TouchableOpacity>
            {renderModal()}
            <TextInput
              ref={input => (textInput = input)}
              style={styles.phoneInput}
              placeholder={placeholder}
              keyboardType="phone-pad"
              value={phoneNumber}
              secureTextEntry={false}
              autoFocus={focusInput}
              onChangeText={onChangePhoneNumber}
              onFocus={onChangeFocus}
              onBlur={onChangeBlur}
            />
          </View>
        </View>

        <View style={styles.viewBottom}>
          <TouchableOpacity onPress={onPressContinue} disabled={phoneNumber === ''}>
            <View style={[styles.button, { backgroundColor: phoneNumber ? '#0db665' : 'gray' }]}>
              <Text style={styles.buttonText}>Continue</Text>
            </View>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoidingView: {
    flex: 1,
    padding: 10,
  },
  textTitle: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    textAlign: 'left',
    color: '#555',
    letterSpacing: 1,
  },
  wrapper: {
    flex: 1,
    width: width - 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#333',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  phoneInputStyle: {
    height: 50,
    flexDirection: 'row',
    paddingHorizontal: 12,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    marginBottom: 10,
    borderBottomColor: '#d6d7da',
    width: width - 40,
  },
  phoneInput: {
    marginLeft: 5,
    fontSize: 16,
    letterSpacing: 1.5,
    color: '#222',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 15,
    paddingHorizontal: 25,
  },
  filterInputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterInput: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
    color: '#424242',
  },
  countryContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#e0e0e0',
    borderTopWidth: 1,
    padding: 10,
  },
  countryItem: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 5,
  },
  countryName: {
    fontSize: 16,
    flex: 1,
  },
  countryCode: {
    fontSize: 16,
  },
  openDialog: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
  },
  closeButton: {
    padding: 12,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 20,
    padding: 5,
    fontWeight: 'bold',
    color: '#333',
  },
  viewBottom: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 40,
  },
  button: {
    width: width - 40,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    alignItems: 'center',
  },
})

export default PhoneInputScreen
