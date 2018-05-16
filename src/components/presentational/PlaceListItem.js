import React from 'react';
import {View, Text , StyleSheet, TouchableOpacity, Image} from 'react-native';

const placeListItem = (props) =>(
  <TouchableOpacity
    onPress = {props.onPlacePressed} 
  >  
    <View
      style = {styles.listItem}
    >
      <Image
        resizeMode = 'contain'
        style = {styles.placeImage}
        source ={props.placeImage}
      />
      <Text>{props.placeName}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({

  listItem:{
    width:'100%',
    padding: 7,
    marginBottom:5,
    backgroundColor:'#efe',
    flexDirection:'row',
    alignItems: 'center'
  },
  placeImage:{
    marginRight:8,
    height:30,
    width:50,
   

  },
});

export default placeListItem;