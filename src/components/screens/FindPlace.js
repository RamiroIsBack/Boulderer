import React, {Component} from 'react';
import {View,Text} from 'react-native';
import {connect} from 'react-redux'
import {deletePlace} from '../../store/actions'
import ShowPlacesContainer from '../containers/ShowPlacesContainer'

class FindPlaceScreen extends Component {
  constructor(props){
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatiorEvent);
  };
  
  onNavigatiorEvent = (event) =>{
    if(event.type === 'NavBarButtonPress'){
      if(event.id === 'sideDrowerToggle'){
        this.props.navigator.toggleDrawer({
          side:'left',
          animated: true,
          
        });
      }
    }
  };

  itemSelectedHandler = key =>{
    const selPlace = this.props.places.find(place =>{
      return place.key ===key;
    })
    this.props.navigator.push({
      screen:'bloka.PlaceDetailScreen',
      title: selPlace.name,
      passProps:{
        selectedPlace: selPlace
      }
    });
  }
  render(){
    return(
      <View>
        <Text>
          Find places here
        </Text>
        <ShowPlacesContainer
          placesList = {this.props.places}
          onItemSelected = {this.itemSelectedHandler}
        />
      </View>
    );
  }

}
mapDispatchToProps = dispatch =>{
  return{
    onDeletePlace : (key) => dispatch(deletePlace(key))

  }
}
mapStateToProps= state => {
  return{
    places:state.places.places
  };
};

export default connect(mapStateToProps,mapDispatchToProps) (FindPlaceScreen);