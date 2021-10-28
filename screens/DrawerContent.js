import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { Avatar, Title, Caption, Drawer } from 'react-native-paper'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../navigation/AuthProvider'

const DrawerContent = (props) => {
  const { user } = useContext(AuthContext)
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
              <Avatar.Image
                source={require('../assets/logo.png')}
                size={60}
              />
              <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                <Title style={styles.title}>{user ? user.phoneNumber : '+254720000000'}</Title>
                <Caption style={styles.caption}>Versão 1.0</Caption>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ size }) => (
                <Ionicons name="ios-home" size={size} color="#888" />
              )}
              label="Home"
              onPress={() => { props.navigation.navigate('HomeStack') }}
            />
            <DrawerItem
              icon={({ size }) => (
                <Ionicons name="pause-circle-outline" size={size} color="#888" />
              )}
              label="Active Sessions"
              onPress={() => { props.navigation.navigate('SessionsStack') }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    marginTop: 15,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  drawerSection: {
    marginTop: 20,
  },
})

export default DrawerContent
