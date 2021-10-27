import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper'

import Providers from './navigation';
import OnboardingScreen from './screens/OnboardingScreen';

export default function App() {
  return (
    <PaperProvider>
      <Providers />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
