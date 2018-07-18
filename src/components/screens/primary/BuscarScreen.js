import React, {Component} from 'react';
import {View,Text} from 'react-native';
import SearchScreen from '../secundary/SearchScreen'
class BuscarScreen extends Component {
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
        <SearchScreen
        navigator= {this.props.navigator}/>
      </View>

    );
  }
}
export default BuscarScreen;