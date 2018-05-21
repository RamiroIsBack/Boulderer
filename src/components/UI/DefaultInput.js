import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const defaultInput = props => (
  <TextInput
    underlineColorAndroid = 'transparent'
    {...props}
    style = {[
      styles.input, props.style, props.valid || !props.touched ? null: styles.invalid
    ]}
  />

);
const styles = StyleSheet.create({
  input:{
    width:'100%',
    borderColor:'#eee',
    borderWidth:1,
    padding:5,
    marginTop:8,
    marginBottom:8,
    backgroundColor:'#ccc'
  },
  invalid:{
    borderColor:'red',
    borderWidth:3,
    padding:5
  }
}); 

export default defaultInput;