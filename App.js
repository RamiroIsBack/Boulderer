import { Navigation } from 'react-native-navigation';
import {Provider} from 'react-redux';
//Android API mapsKey: AIzaSyDmFLKpBo_cI2cGhkiygTSR7UI4C3hT544
//IOS API mapsKey: AIzaSyBTr5rkEOzVq1yTdBEh-eDGmq-l35tSmrE
import AuthScreen from './src/components/screens/Auth';
import SharePlaceScreen from './src/components/screens/SharePlace';
import FindPlaceScreen from './src/components/screens/FindPlace';
import PlaceDetail from './src/components/screens/PlaceDetail';

import configureStore from './src/store/configureStore';
import SideDrower from './src/components/screens/SideDrower';
const store = configureStore();

// Register Screens
Navigation.registerComponent(
  'bloka.AuthScreen',
  () => AuthScreen,
  store,
  Provider
);
Navigation.registerComponent(
  'bloka.SharePlaceScreen',
  ()=> SharePlaceScreen,
  store,
  Provider
);
Navigation.registerComponent (
  'bloka.FindPlaceScreen',
  ()=> FindPlaceScreen,
  store,
  Provider
);
Navigation.registerComponent (
  'bloka.PlaceDetailScreen',
  ()=> PlaceDetail,
  store,
  Provider
  
);
Navigation.registerComponent (
  'bloka.SideDrower',
  ()=> SideDrower, 
);
// Start a App
Navigation.startSingleScreenApp({
  screen: {
    screen: 'bloka.AuthScreen',
    title: 'Login'
  }
});