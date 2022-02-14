import './global';
import 'react-native-gesture-handler';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper'

import Providers from './navigation';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  "Warning: The provided value 'moz",
  "Warning: The provided value 'ms-stream",
  "Warning: The provided value 'moz-chunked-arraybuffer"
])

export default function App() {
  return (
    <PaperProvider>
      <Providers />
    </PaperProvider>
  );
}
