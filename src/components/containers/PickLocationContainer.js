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
    }
  }
  render(){
    return(
      <View style= {styles.pickLocationContanier} >
        
        <MapView
          style= {styles.map}
          initialRegion={this.state.focusedLocation}
        />
      
        <View style = {styles.button}>
          <Button onPress = {this.props.placeAddedHandler} title = 'map me dude!' />
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