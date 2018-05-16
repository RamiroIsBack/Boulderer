import React , {Component} from 'react';
import {Text, Button, View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import imagePreview from '../../assets/kitten.jpg';

class PickLocationContanier extends Component{
  render(){
    return(
      <View style= {styles.pickLocationContanier} >
        <View style = {styles.placeholder}>
          <Text>MAP</Text>
        </View>
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
  placeholder:{
    borderWidth :1,
    borderColor:'black',
    backgroundColor:'#eee',
    width:'80%',
    height:150,
  },
  button:{
    margin:8
  },
  
}); 
export default PickLocationContanier