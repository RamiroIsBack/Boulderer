import React, {Component} from 'react';
import {FlatList , Text, StyleSheet} from 'react-native'
import PlaceListItem from '../presentational/PlaceListItem'
class ShowPlacesContainer extends Component {
  
  render(){    
    return(
      <FlatList style = {styles.listContainer}
        data = {this.props.placesList}
        renderItem= {(info)=>(
          <PlaceListItem
            placeName={info.item.name}
            placeImage = {info.item.image}
            onPlacePressed = {() => this.props.onItemSelected(info.item.key)}
          />
        )}
      />
    );
  }
}
const styles = StyleSheet.create({
  listContainer:{
    width:'100%'
  }
});

export default ShowPlacesContainer;