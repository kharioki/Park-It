import React, { useRef } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'

import ParkingCard from './ParkingCard'

const ListView = ({ mapState, setSelectedSession }) => {
  const _scrollView = useRef(null);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={_scrollView}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={1}
        style={styles.scrollView}
      >
        {mapState.markers.map((marker, index) => (
          <ParkingCard
            key={index}
            marker={marker}
            onPress={() => setSelectedSession(marker)}
          />
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  scrollView: {
    marginTop: 150,
  },
})

export default ListView
