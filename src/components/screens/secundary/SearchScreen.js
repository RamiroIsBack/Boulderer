import React, {Component} from 'react';
import {View,} from 'react-native';
import AreasList from '../../containers/AreasList';
import {Navigation} from 'react-native-navigation';
 

class SearchScreen extends Component {
  
  state= {
    searchFor : 'areas'
  }

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
  itemSelectedHandler =(id,nombre)=>{
    this.props.navigator.push({
      screen:'bloka.PlaceDetailScreen',
      title: nombre,
      passProps:{
        areaId: id
      }
    });
  }
  searchCases = () =>{
    switch (this.state.searchFor) {
      case 'areas':
        return(
          <AreasList
            onItemSelected = {this.itemSelectedHandler}/>
        );
      case 'problems':
        return(
          <ProblemsList/>
        );
      case 'users':
        return(
          <UsersList/>
        );

      default:
        return null;
    }
    
  }
  
  render(){
    let listComponent = null;
    listComponent = this.searchCases()  
    return(
      <View>
        {listComponent}
      </View>

    );
  }
}
export default SearchScreen;