import React , {Component} from 'react';
import {View, Text, TouchableOpacity } from 'react-native';
import {Navigation} from 'react-native-navigation'

class TransitionLightbox extends Component {
  
  closeHandler = ()=>{
    Navigation.dismissLightBox();
  }
  render(){
    return(
      <View>
        <Text>entrar a ver la zona</Text>
        <View>
          <TouchableOpacity
            onPress =  {this.props.goToAreaHandler(this.props.areaId,this.props.AreaNombre)}>
            <Text>si</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress = {this.closeHandler}>
            <Text>no</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
export default TransitionLightbox;