import React , {Component} from 'react';
import {Text,Image, Button, View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import imagePreview from '../../assets/kitten.jpg';
import ImagePicker from 'react-native-image-picker'
class PickImageContanier extends Component{
  state={
    pickedImage :null
  }

  pickImageHandler=()=>{
    ImagePicker.showImagePicker({title:'elige una foto'}, res=> {
      if(res.didCancel){
        console.log('operacion de imagePicker cancelada por usuario');
      }else if (res.error){
        console.log('error: ', res.erro);
      }else{
        this.setState({
          pickedImage:{uri: res.uri}
        });
        this.props.onImagePicked({uri:res.uri ,base64:res.data});
      }
    }
  )
  }
  render(){
    return(
      <View style= {styles.pickImageContanier} >
        <View style = {styles.placeholder}>
          <Image source = { this.state.pickedImage} style = {styles.previewImage} />
        </View>
        <View style = {styles.button}>
          <Button onPress = {this.pickImageHandler} title = 'elige una foto' />
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