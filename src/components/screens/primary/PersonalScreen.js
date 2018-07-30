import React, {Component} from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import {Navigation} from 'react-native-navigation';

class PersonalScreen extends Component {
  static navigatorStyle = {
    navBarButtonColor : 'blue'
  }
  state= {
    
  }

  constructor(props){
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    this.state={
      spinner:{
        value:'test test check check',
        active:true
      }
    }
  };
  
  onNavigatorEvent = (event) =>{
    if(event.type === 'NavBarButtonPress'){
      if(event.id === 'sideDrowerToggle'){
        this.props.navigator.toggleDrawer({
          side:'left',
          animated: true,
          
        });
      }
    }
  };
  finishingAddingNewArea=(done)=>{
    console.log(done);
    Navigation.dismissModal({
      animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
    });
  }
  closeSpinner(){
    Navigation.dismissModal({
      animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
    });
    this.setState(prevState=>{
      return{
        ...prevState.spinner,
        spinner:{
          value: 'ou yeahhh',
          active:false
        }
      }
    })
    this.openSpiner();
  };
  openSpiner = ()=>{
    Navigation.showModal({
      screen: 'bloka.SpinnerModal', 
      passProps: {
        finishingAddingNewArea:(done)=>this.finishingAddingNewArea(done),
        spinner: this.state.spinner
      }, 
      animationType: 'slide-up'
    });
    setTimeout(() => {
      this.closeSpinner();
    }, 3000);
  };

  render(){
    return(
      <View>
        <TouchableOpacity onPress={this.openSpiner}>
          <Text>open spinner</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.closeSpinner}>
          <Text>Close spinner</Text>
        </TouchableOpacity>
      </View>

    );
  }
}
export default PersonalScreen;