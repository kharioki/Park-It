import React, { useState } from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'
import Checkbox from 'expo-checkbox'
import { useForm, Controller } from 'react-hook-form';

import MapModal from '../components/MapModal'

const CreateLotScreen = ({ navigation }) => {
  const [isSelected, setSelection] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [cordinate, setCordinate] = useState(null);

  const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      location: '',
      capacity: '',
      pricePerHour: '',
      pricePerDay: '',
    }
  });

  const onSubmit = data => {
    console.log(data)
    reset()
  };

  const onChange = arg => {
    return {
      value: arg.nativeEvent.text,
    }
  };

  console.log('errors', errors);

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Add Parking Lot</Text>
        <Ionicons.Button
          name="ios-close"
          size={30}
          color="#888"
          backgroundColor="transparent"
          onPress={() => navigation.goBack()} />
      </View>
      <ScrollView style={styles.formContainer}>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              label='Lot Name'
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="name"
          rules={{ required: true }}
        />
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              label='Lot Location'
              placeholder='e.g. Westlands, Nairobi'
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="location"
          rules={{ required: true }}
        />
        {!cordinate && (
          <Button
            icon="map-marker-plus"
            mode="contained"
            style={[styles.button, { width: '50%' }]}
            onPress={() => showModal()}>
            Drop Pin
          </Button>
        )}
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              label='Capacity (parking slots available)'
              placeholder='e.g. 100'
              keyboardType='numeric'
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="capacity"
          rules={{ required: true }}
        />
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              label='Price per day'
              placeholder='e.g. 100'
              keyboardType='numeric'
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="pricePerDay"
          rules={{ required: true }}
        />
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              label='Price per hour'
              placeholder='e.g. 100'
              keyboardType='numeric'
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="pricePerHour"
          rules={{ required: true }}
        />
        <Text style={[styles.text, { color: '#0db665', marginVertical: 8 }]}>Parking available for the following:</Text>
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={true}
            onValueChange={setSelection}
            style={styles.checkbox}
            color={'#0db665'}
          />
          <Text style={styles.text}>Small vehicles(Sedan, SUV, Saloon)</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={true}
            onValueChange={setSelection}
            style={styles.checkbox}
            color={'#0db665'}
          />
          <Text style={styles.text}>Motorbikes and Bicycles</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={false}
            onValueChange={setSelection}
            style={styles.checkbox}
            color={'#0db665'}
          />
          <Text style={styles.text}>Larger vehicles(Truck, vans)</Text>
        </View>

        <View style={styles.divider} />

        <Text style={[styles.text, { color: '#0db665', marginVertical: 8 }]}>Basic services available:</Text>
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={true}
            onValueChange={setSelection}
            style={styles.checkbox}
            color={'#0db665'}
          />
          <Text style={styles.text}>Security & CCTV Surveillance</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={true}
            onValueChange={setSelection}
            style={styles.checkbox}
            color={'#0db665'}
          />
          <Text style={styles.text}>24-Hour-Service</Text>
        </View>

        <View style={styles.divider} />

        <Text style={[styles.text, { color: '#0db665', marginVertical: 8 }]}>Add Paid services:</Text>
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={true}
            onValueChange={setSelection}
            style={styles.checkbox}
            color={'#0db665'}
          />
          <Text style={styles.text}>Car wash</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={false}
            onValueChange={setSelection}
            style={styles.checkbox}
            color={'#0db665'}
          />
          <Text style={styles.text}>Charging</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            icon="check"
            mode="contained"
            style={[styles.button, { width: '80%' }]}
            onPress={handleSubmit(onSubmit)}>
            Create Lot
          </Button>
        </View>
      </ScrollView>

      <MapModal
        visible={modalVisible}
        onHideMapModal={hideModal}
        onSetCordinate={setCordinate}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: 10,
  },
  headerText: {
    fontSize: 16,
    color: '#0db665',
    marginLeft: 20,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 6,
    backgroundColor: '#0db665',
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    color: '#888'
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    marginRight: 10,
  },
  divider: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5,
    marginBottom: 10,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
})

export default CreateLotScreen
