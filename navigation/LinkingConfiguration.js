import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

const linking = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Onboarding: 'onboarding',
      Connect: 'connect',
      SelectUserType: 'select-user-type',
    },
  },
};

export default linking;
