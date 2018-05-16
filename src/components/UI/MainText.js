import React from 'react';
import {Text, StyleSheet} from 'react-native';

const mainText = (props) =>(
  <Text

    {...props}
    style = {[styles.mainText, props.style]}
  >
    {props.children}
  </Text>
);
const styles = StyleSheet.create({
  mainText:{
    color:'#bbb',
    backgroundColor: 'transparent',
  }
});
export default mainText;