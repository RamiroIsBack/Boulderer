import React , {Component} from 'react';
import {View, Text, TouchableOpacity } from 'react-native';
import {Navigation} from 'react-native-navigation'
import {graphql} from 'react-apollo'
import DeleteAreaMutation from '../../mutations/DeleteArea'; 

class DeleteArea extends Component {
  deleteHandler= ()=>{
    //mutation deleteHandler
  }
  closeHandler = ()=>{
    Navigation.dismissLightBox();
  }
  render(){
    return(
      <View>
        <Text>Seguro que quieres eliminar la zona?</Text>
        <View>
          <TouchableOpacity
            onPress =  {this.deleteHandler}>
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
export default graphql (DeleteAreaMutation) (DeleteArea);