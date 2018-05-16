import React , {Component} from 'react';
import {Text,Image, Button, View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import imagePreview from '../../assets/kitten.jpg';

class PickImageContanier extends Component{
  render(){
    return(
      <View style= {styles.pickImageContanier} >
        <View style = {styles.placeholder}>
          <Image source = {imagePreview} style = {styles.previewImage} />
        </View>
        <View style = {styles.button}>
          <Button onPress = {()=>{alert('cacotga')}} title = 'locate me' />
        </View>
      </View>
    );
  }
}
const styles= StyleSheet.create({
  pickImageContanier:{
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
  previewImage:{
    width:'100%',
    height:'100%'
  }
}); 
export default PickImageContanier