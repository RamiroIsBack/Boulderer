import React, {Component} from 'react';
import {View,Text,StyleSheet,Dimensions,TouchableOpacity,Platform } from 'react-native';
import {Navigation} from 'react-native-navigation';
import {graphql} from 'react-apollo';
import getAreasQuery from '../../../queries/GetAreas';

import MapView  from 'react-native-maps'
import { Marker , Callout} from 'react-native-maps';

class MapaScreen extends Component {
  static navigatorStyle = {
    navBarButtonColor : 'blue'
  }
  state ={
    region:{
      latitude: 34.126682,
      longitude:-116.3563012,
      latitudeDelta:8.5,
      longitudeDelta:Dimensions.get('window').width /
      Dimensions.get('window').height * 8.5
    },
  }
  constructor(props){
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  };
  componentWillMount(){
    navigator.geolocation.getCurrentPosition(
      pos =>{
        this.setState({
          latitude: pos.coords.latitude,
          longitude:pos.coords.longitude,
        });      
      },
      err=>{
        console.log(err);
        alert('error al pillar la posicion');
      }
    )
  }
  
  onNavigatorEvent = (event) =>{
    if(event.type === 'NavBarButtonPress'){
      if(event.id === 'sideDrowerToggle'){
        this.props.navigator.toggleDrawer({
          side:'left',
          animated: true,       
        });
      }
    }
  };

  goToAreaHandler = (id,nombre) =>{
    this.props.navigator.push({
      screen:'bloka.PlaceDetailScreen',
      title: nombre,
      passProps:{
        areaId: id
      }
    });
  }
  workaroundForAndroid = (areaId,areaNombre) =>{
    if(Platform.OS === 'android'){
      this.goToAreaHandler(areaId,areaNombre)
        
    }else{
      //IOS gets the clic on the Callout directly
    }
  }
  
  render(){
    let markers = null;
    if(this.props.data){
      if(!this.props.data.loading){
        markers = (
          this.props.data.areas.map(area => (
            <Marker
            coordinate={{latitude: area.latitude, longitude:area.longitude}}
            title={area.nombre}
            description={area.description}
            image={require('../../../assets/climbing-2.png')}
            key= {area.id}
            id = {area.id}
            onPress= {()=>this.workaroundForAndroid(area.id,area.nombre)}>
            <Callout>
              <TouchableOpacity
                onPress= {()=>this.goToAreaHandler(area.id,area.nombre)}
                id= {area.id}>
                <View style={styles.calloutText}>
                  <Text style= {styles.areaName}>{area.nombre}</Text>
                  <Text>{area.description}</Text>
                </View>
              </TouchableOpacity>
            </Callout>
            </Marker>
          ))
        );
        //<div>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
      }
    }
    return(
      <View style= {styles.mapContainer}>
        <MapView
              initialRegion={this.state.region}
              style={styles.map}>
          {markers}
        </MapView>
      </View>

    );
  }
}
const styles = StyleSheet.create({
  mapContainer:{
   flex:1
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  calloutText:{
    alignItems:'center'
  },
  areaName: {
    fontWeight: 'bold',
    textAlign: 'center',
    
  },
  
});
export default graphql(getAreasQuery) (MapaScreen);