import { Navigation } from 'react-native-navigation';
import {Provider} from 'react-redux';
//Android API mapsKey: AIzaSyDmFLKpBo_cI2cGhkiygTSR7UI4C3hT544
//IOS API mapsKey: AIzaSyBTr5rkEOzVq1yTdBEh-eDGmq-l35tSmrE
import AuthScreen from './src/components/screens/primary/AuthScreen';
import SharePlaceScreen from './src/components/screens/secundary/SharePlace';
import FindPlaceScreen from './src/components/screens/secundary/FindPlace';
import PersonalScreen from './src/components/screens/primary/PersonalScreen';
import SearchScreen from './src/components/screens/secundary/SearchScreen';
import MapaScreen from './src/components/screens/primary/MapaScreen';
import BuscarScreen from './src/components/screens/primary/BuscarScreen';
import CompartirScreen from './src/components/screens/primary/CompartirScreen';
import PlaceDetail from './src/components/screens/secundary/PlaceDetail';
import SideDrower from './src/components/screens/SideDrower';
import AddAreaScreen from './src/components/screens/secundary/AddAreaScreen';
import AddProblemScreen from './src/components/screens/secundary/AddProblemScreen';
import ErrorLightBox from './src/components/presentational/ErrorLightBox';

import {startAuth} from './src/components/screens/startScreens';

import configureStore from './src/store/configureStore';
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
  'bloka.MapaScreen',
  ()=> apolloAndReduxProviderHOC(MapaScreen, client), store, Provider
);
Navigation.registerComponent(
  'bloka.BuscarScreen',
  ()=> apolloAndReduxProviderHOC(BuscarScreen, client), store, Provider
);
Navigation.registerComponent(
  'bloka.CompartirScreen',
  ()=> apolloAndReduxProviderHOC(CompartirScreen, client), store, Provider
);
Navigation.registerComponent(
  'bloka.PersonalScreen',
  ()=> apolloAndReduxProviderHOC(PersonalScreen, client), store, Provider
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
Navigation.registerComponent(
  'bloka.SearchScreen',
  () => apolloAndReduxProviderHOC(SearchScreen, client), store, Provider
);
Navigation.registerComponent(
  'bloka.AddProblemScreen',
  () => apolloAndReduxProviderHOC(AddProblemScreen, client), store, Provider
);
Navigation.registerComponent(
  'bloka.AddAreaScreen',
  () => apolloAndReduxProviderHOC(AddAreaScreen, client), store, Provider
);
Navigation.registerComponent(
  'bloka.ErrorLightBox',
  () => ErrorLightBox
);
// Start a App
startAuth();