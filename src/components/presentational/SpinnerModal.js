import React,{Component} from 'react';
import { View, Text , StyleSheet} from 'react-native';
import {Navigation} from 'react-native-navigation';
import CustomButton from '../UI/CustomButton';
import {startMainTabs} from '../screens/startScreens';
import Spinner from 'react-native-loading-spinner-overlay';

class SpinnerModal extends Component {
  
  closeIt = () =>{
    Navigation.dismissModal();
    this.props.finishingAddingNewArea(true);
  }
  render(){
    let body = null;
    switch (this.props.spinner.active) {
      case true:
        body = (
          <View style = {styles.container}>
            <Spinner visible={this.props.spinner.active} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
          </View>
        )
        break;
      case false:
        body=(
          <View style = {styles.container}>
            <Text>{this.props.spinner.value}</Text>
            <CustomButton 
              color='#29aaf4' 
              onPress={this.closeIt}
              message ='cerrar'
            >
            </CustomButton>
          </View>
        )
        break;
      
      default:
        body = null;
    }
    return(body);
  }  
  
}

const styles = StyleSheet.create({
  container:{
    margin:5,
    padding:25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'white',
    borderColor:'black',
    borderRadius: 10
  }
})
export default SpinnerModal;