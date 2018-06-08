import React, {Component} from 'react';
import {View,Text} from 'react-native';

class PersonalScreen extends Component {
  static navigatorStyle = {
    navBarButtonColor : 'blue'
  }
  state= {
    
  }

  constructor(props){
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
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
  render(){
    return(
      <View>
        <Text>PersonalScreen</Text>
      </View>

    );
  }
}
export default PersonalScreen;