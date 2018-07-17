import React from 'react';
import {
  TouchableOpacity, TouchableNativeFeedback ,Text ,View, StyleSheet, Platform
} from 'react-native';

const buttonWhithBackground = (props) =>{
  const content =(
    <View
      style= {[
        styles.button,
        {backgroundColor: props.color},
        props.disabled? styles.disabled : null
      ]}
    >
      <Text
      style= {props.disabled? styles.disabledText : null }>{props.message}</Text>
    </View>
  );

  if(props.disabled){
    return(
      content
    );
  }

  if (Platform.OS ==='android'){
    return (
      <TouchableNativeFeedback
        onPress = {props.onPress}
      {...props}
      >
        {content}
      </TouchableNativeFeedback>
    );
  }
  return(
    <TouchableOpacity
      onPress = {props.onPress}
      {...props}
      >
        {content}  
    </TouchableOpacity>

  );
};

const styles = StyleSheet.create({
  button:{
    padding:10,
    margin:5,
    borderRadius: 5,
    borderWidth:1,
    borderColor:'black'

  },
  disabled:{
    backgroundColor:'#ddd',
  },
  disabledText:{
    color:'#aaa'
  }
});

export default buttonWhithBackground;