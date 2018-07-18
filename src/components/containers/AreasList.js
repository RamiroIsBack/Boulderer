import React, {Component} from 'react';
import {FlatList , Text, StyleSheet} from 'react-native'
import PlaceListItem from '../presentational/PlaceListItem'
import getAreasQuery from '../../queries/GetAreas';
import {graphql} from 'react-apollo';

class AreasList extends Component {
  
  render(){    
    console.log(this.props.data);
    return(
      <FlatList style = {styles.listContainer}
        data = {this.props.data.areas}
        renderItem= {(info)=>(
          <PlaceListItem
            key= {info.item.id}
            placeName={info.item.nombre}
            placeImage = {info.item.photo}
            onPlacePressed = {() => this.props.onItemSelected(info.item.id, info.item.nombre)}
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

export default graphql (getAreasQuery) (AreasList);