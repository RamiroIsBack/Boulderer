import React, { Component } from 'react';
import {Platform, TouchableOpacity, View, Text, Dimensions, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons/';

class SideDrower extends Component {
  render() {
    return (
      <View
      style={[
        styles.container,{ width: Dimensions.get('window').width * 0.8 }
          ]}
      >
        <TouchableOpacity>
          <View style= {styles.drowerItem} >
            <Icon
              name= {Platform.OS==='android'?'md-log-in':'ios-log-in'}
              size = {30} color= 'green' style = {styles.drowerItemIcon}/>
            <Text>log In</Text>
          </View>
        </TouchableOpacity>  
        <TouchableOpacity>  
          <View style= {styles.drowerItem} >  
            <Icon 
              name={Platform.OS==='android'?'md-log-out':'ios-log-out'}
              size = {30} color= 'red'  style = {styles.drowerItemIcon}/>
            <Text>log Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: '#eee',
    flex: 1,
  },
  drowerItem:{
    flexDirection:'row',
    alignItems: 'center',
    padding: 10
  },
  drowerItemIcon:{
    paddingRight:10,
  }
})
export default SideDrower;