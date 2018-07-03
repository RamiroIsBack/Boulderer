import React , {Component} from 'react';
import {Text, Button, View, StyleSheet,Dimensions} from 'react-native';
import {connect} from 'react-redux';
import imagePreview from '../../assets/kitten.jpg';
import MapView from 'react-native-maps'

class PickLocationContanier extends Component{
  state ={
    focusedLocation:{
      latitude: 37.7900352,
      longitude:-122.403724,
      latitudeDelta:0.0122,
      longitudeDelta:Dimensions.get('window').width /
      Dimensions.get('window').height * 0.0122
    },
    locationChosen: false,
  }
  pickLocationHandler = event =>{
    const coords = event.nativeEvent.coordinate
    this.setState (prevState =>{
      return{
        focusedLocation:{
          ...prevState.focusedLocation,
          latitude:coords.latitude,
          longitude:coords.longitude,

        },
        locationChosen: true,

      }
    });
    this.mapRef.animateToRegion({
      ...this.state.focusedLocation,
      latitude:coords.latitude,
      longitude: coords.longitude,
    });
    this.props.locationPickHandler({
      latitude: coords.latitude,
      longitude: coords.longitude,
    })
  }
  getLocationHandler = () =>{
    navigator.geolocation.getCurrentPosition(
      pos =>{
        const coordsEvent={
          nativeEvent:{
            coordinate:{
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            }
          }
        };
        this.pickLocationHandler(coordsEvent);
      },
      err=>{
        console.log(err);
        alert('error al pillar la posicion');
      }
    )
  }
  render(){
    let marker= null;
    if (this.state.locationChosen){
      marker = (<MapView.Marker coordinate = { this.state.focusedLocation}/>);
    }
    return(
      <View style= {styles.pickLocationContanier} >
        
        <MapView
          style= {styles.map}
          initialRegion={this.state.focusedLocation}
          onPress = {this.pickLocationHandler}
          ref = {ref => this.mapRef = ref}>
          
          {marker}
        </MapView>
      
        <View style = {styles.button}>
          <Button onPress = {this.getLocationHandler} title = 'centrar mapa en mi localizacion' />
        </View>
      </View>
    );
  }
}
const styles= StyleSheet.create({
  pickLocationContanier:{
    width:'100%',
    alignItems:'center'
  },
  map:{
    width:'100%',
    height:250,
  },
  button:{
    margin:8
  },
  
}); 
export default PickLocationContanier