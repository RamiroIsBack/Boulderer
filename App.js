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
import apolloAndReduxProviderHOC from './src/utility/Hoc'
//https://blog.beeaweso.me/using-apollo-client-2-0-with-redux-in-wix-react-native-navigation-8aa9590d4ea1
import ApolloClient, {HttpLink, InMemoryCache}  from "apollo-boost";

// const httpLink = new HttpLink({
//   uri: 'http://localhost:4000/graphql',
//   opts: {
//     credentials: 'same-origin'
//   }
// })

const client = new ApolloClient({
  //link: httpLink,
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache({dataIdFromObject: o => o.id})
});
const store = configureStore();

// Register Screens
Navigation.registerComponent(
  'bloka.AuthScreen',
  () => apolloAndReduxProviderHOC(AuthScreen, client), store, Provider
);
Navigation.registerComponent(
  'bloka.SharePlaceScreen',
  ()=> apolloAndReduxProviderHOC(SharePlaceScreen, client), store, Provider
);
Navigation.registerComponent (
  'bloka.FindPlaceScreen',
  ()=> apolloAndReduxProviderHOC(FindPlaceScreen, client), store, Provider
);
Navigation.registerComponent (
  'bloka.PlaceDetailScreen',
  ()=> apolloAndReduxProviderHOC(PlaceDetail, client), store, Provider
  
);
Navigation.registerComponent (
  'bloka.SideDrower',
  ()=> apolloAndReduxProviderHOC (SideDrower,client) , store, Provider
);
// Start a App
Navigation.startSingleScreenApp({
  screen: {
    screen: 'bloka.AuthScreen',
    title: 'Login'
  }
});