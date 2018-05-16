import React, { Component } from 'react';
import { View, Text, Button ,TextInput, StyleSheet, ImageBackground} from 'react-native';
import startMainTabs from './MainTabs/startMainTabs';
import DefaultInput from '../UI/DefaultInput';
import HeadingText from '../UI/HeadingText';
import MainText from '../UI/MainText';
import ButtonWhithBackground from '../UI/CustomButton';

import backgroundImage from '../../assets/knee_tatoo.jpg'

class AuthScreen extends Component {
  loginHandler = ()=>{
    startMainTabs();
  }
  render() {
    return (
    <ImageBackground
        source = {backgroundImage}
        style = {styles.backgroundImage}
      >
      <View style= {styles.container}>
        
        <MainText>
          <HeadingText>yo!, log in</HeadingText>
        </MainText>
        <ButtonWhithBackground
          color='#29aaf4'
          onPress = {()=>{alert('caca')}}
        >Switch to login</ButtonWhithBackground>
        <View style = {styles.inputContanier}>
          <DefaultInput placeholder= 'your email address' />
          <DefaultInput placeholder= 'Password' />
          <DefaultInput placeholder= 'Confirm pasword' />
        </View>
        <ButtonWhithBackground
          onPress={this.loginHandler}
          color='#29aaf4'
        >
        Submit
        </ButtonWhithBackground>
      </View>
    </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  inputContanier:{
    width:'80%',
    
    
  },
  backgroundImage:{
    width:'100%',
    flex: 1,
  }
}); 

export default AuthScreen;