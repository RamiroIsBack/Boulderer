import React, {Component} from 'react';
import {View,StyleSheet,ScrollView} from 'react-native';
import ListAreas from '../../containers/ListAreas';
import ListProblems from '../../containers/ListProblems';
import ListUsers from '../../containers/ListUsers'; 
import RadioForm from 'react-native-simple-radio-button';
import DefaultInput from '../../UI/DefaultInput';

class SearchScreen extends Component {
  
  state= {
    input:'',
    searchTypeValue : 'areas',
    searchTypeLabel:'area',
    radioTypes : [{label:'area',value:'areas'},
      {label:'bloque',value:'problems'},
      {label:'escalador',value:'users'}]
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
  areaSelectedHandler =(id,nombre)=>{
    this.props.navigator.push({
      screen:'bloka.PlaceDetailScreen',
      title: nombre,
      passProps:{
        areaId: id
      }
    });
  }
  problemSelectedHandler =(id,nombre)=>{
    this.props.navigator.push({
      screen:'bloka.ProblemDetailScreen',
      title: nombre,
      passProps:{
        problemId: id
      }
    });
  }
  userSelectedHandler =(id,nombre)=>{
    // this.props.navigator.push({
    //   screen:'bloka.UserDetailScreen',
    //   title: nombre,
    //   passProps:{
    //     areaId: id
    //   }
    // });
  }
  swithcSearchType =(value,index) => {
    let searchTypeLabel = this.state.radioTypes[index].label;
    this.setState({searchTypeValue:value,searchTypeLabel})
  }
  searchCases = () =>{
    switch (this.state.searchTypeValue) {
      case 'areas':
        return(
          <ListAreas
            input= {this.state.input}
            onItemSelected = {this.areaSelectedHandler}/>
        );
      case 'problems':
        return(
          <ListProblems
          input= {this.state.input}
          onItemSelected = {this.problemSelectedHandler}/>
        );
      case 'users':
        return(
          <ListUsers
          input= {this.state.input}
          onItemSelected = {this.userSelectedHandler}/>
        );

      default:
        return null;
    }
  }
  updateInputState=(val)=>{
    this.setState({input:val});
  }
  render(){
    let listComponent = null;
    listComponent = this.searchCases()  
    return(
      <View style= {styles.container}>
        <View style ={styles.listAndInputContainer}>
          <View style = {styles.inputContainer}>
          <DefaultInput
            placeholder={`que ${this.state.searchTypeLabel} buscas?`}
            style={styles.input}
            value={this.state.input}
            onChangeText={val => this.updateInputState(val)}
            />
          </View>
          <ScrollView>
            <View style = {styles.flatListContainer}>
              {listComponent}
            </View>
          </ScrollView>
        </View>
        <View style = {styles.selector}>
          <RadioForm
            radio_props={this.state.radioTypes}
            initial={0}
            style = {styles.buttonsContainer}
            formHorizontal={false}
            labelHorizontal={true}
            labelStyle = {styles.label}
            buttonColor={'#2196f3'}
            animation={true}
            onPress={(value,index)=>this.swithcSearchType(value,index)}
          />
        </View>
      </View>

    );
  }
}
const styles = StyleSheet.create({
  container:{
    width:'100%',
    flexDirection: 'row'
  },
  listAndInputContainer:{
    width:'60%'
  },
  flatListContainer:{

  },
  selector:{
    width:'40%',
    alignItems: 'center',
  },
  buttonsContainer:{
    paddingTop: 10,
    alignItems: 'flex-start'
  },
  label:{
    fontWeight:'bold',
    color:'#2196f3',
    fontSize:16,
  },
  input:{ 
    backgroundColor:'white'
  },
});
export default SearchScreen;