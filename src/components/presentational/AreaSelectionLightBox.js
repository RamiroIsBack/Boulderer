import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Navigation } from 'react-native-navigation'
import { graphql } from 'react-apollo'
import getAreasQuery from '../../queries/GetAreas';
import RadioForm from 'react-native-simple-radio-button';

class AreaSelectionLightBox extends Component {
  constructor () {
    super()
    this.state = {
      radioTypes: []
    }
  }
  componentWillMount= () =>{
    let list= [];
    for (let [i, area] of this.props.data.areas.entries()) {
      list.push(
        {label: area.nombre, value: area.id }
      )
    }
        this.setState({
          radioTypes:list
        })
  }
  selectHandler = (value,index) => {
    let nombre = this.state.radioTypes[index].label;
    this.props.areaSelected(value,nombre);
    Navigation.dismissLightBox();
  }

  
  render() {

    return (
      <View style = {styles.container}>
        <Text>Selecciona una zona</Text>
        <ScrollView>
          <RadioForm 
            radio_props={this.state.radioTypes}
            style = {styles.ListContainer}
            formHorizontal={false}
            labelHorizontal={true}
            labelStyle = {styles.label}
            buttonColor={'#2196f3'}
            animation={true}
            
            onPress={(value,index)=>this.selectHandler(value,index)}
          />

        </ScrollView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    padding:20,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  ListContainer: {
    alignItems: 'flex-start',
    marginTop:10
  },
  label:{
    fontWeight:'bold',
    color:'#2196f3',
    fontSize:18,
  }
});
export default graphql(getAreasQuery)(AreaSelectionLightBox);