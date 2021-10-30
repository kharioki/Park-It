import React, { useContext, useState } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { Avatar, Title, Caption, Drawer, TouchableRipple, Switch, Text, Snackbar } from 'react-native-paper'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from '../navigation/AuthProvider'

const DrawerContent = (props) => {
  const { user } = useContext(AuthContext)
  const [visible, setVisible] = useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);
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
                <Ionicons name="ios-home" size={size} color="#0db665" />
              )}
              label="Home"
              onPress={() => { props.navigation.navigate('HomeStack') }}
            />
            <DrawerItem
              icon={({ size }) => (
                <Ionicons name="pause-circle-outline" size={size} color="#0db665" />
              )}
              label="Active Sessions"
              onPress={() => { props.navigation.navigate('SessionsStack') }}
            />
            <DrawerItem
              icon={({ size }) => (
                <MaterialCommunityIcons name="history" size={size} color="#0db665" />
              )}
              label="Completed Sessions"
              onPress={() => { props.navigation.navigate('HistoryStack') }}
            />
          </Drawer.Section>

          {/* <Drawer.Section title="Preferences">
            <TouchableRipple onPress={() => { }}>
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch value={false} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section> */}

          <Drawer.Section title="Wallet">
            <View onPress={() => { }}>
              <View style={styles.preference}>
                <Text>Celo</Text>
                <TouchableRipple onPress={onToggleSnackBar}>
                  <View style={styles.btn}>
                    <Image source={require('../assets/icons/Celo-Glyph-Color.png')} style={styles.icon} />
                    <Text style={styles.btnText}>Connect</Text>
                  </View>
                </TouchableRipple>
              </View>
            </View>
          </Drawer.Section>

        </View>
      </DrawerContentScrollView>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Close',
          onPress: () => {
            // Do something
          },
        }}>
        Please connect to your Valora Wallet.
      </Snackbar>
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
    color: '#0db665',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  drawerSection: {
    marginTop: 20,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 18,
    backgroundColor: '#0db66510',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  btnText: {
    fontSize: 16,
    color: '#0db665',
  }
})

export default DrawerContent
