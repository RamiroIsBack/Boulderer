import React from 'react';
import { View, TextInput } from 'react-native';
import DefaultInput from '../UI/DefaultInput';


const placeInput = props => (

  <DefaultInput
    placeholder={props.placeholder}
    value={props.placeName}
    onChangeText={props.onChangeText}
  />


);

export default placeInput;