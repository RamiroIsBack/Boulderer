import React, {Component} from 'react';
import {FlatList , Text, StyleSheet} from 'react-native'
import PlaceListItem from '../presentational/PlaceListItem'
import getProblemsQuery from '../../queries/GetProblems';
import {graphql} from 'react-apollo';
import {filterList} from '../../utility/validation'

class ListProblems extends Component {
  
  render(){    
    let list = null;
    if (!this.props.data.loading){
      list =filterList(this.props.data.problems,this.props.input);
    }  
    return(
      <FlatList style = {styles.listContainer}
        data = {list}
        keyExtractor={item => item.id}
        renderItem= {(info)=>(
          <PlaceListItem           
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

export default graphql (getProblemsQuery) (ListProblems);