import React,{Component} from 'react';
import {View,Text,Button, Image, ScrollView , StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {addPlace} from '../../store/actions';
import HeadingText from '../UI/HeadingText';
import MainText from '../UI/MainText';
import PickImageContainer from '../containers/PickImageContainer';
import PickLocationContanier from '../containers/PickLocationContainer';
import PlaceInput from '../presentational/placeInput';
import validate from '../../utility/validation'

class SharePlaceScreen extends Component {
  static navigatorStyle = {
    navBarButtonColor : 'blue'
  }
  state = {
    controls:{
      placeName:{
        value:'',
        valid:false,
        touched:false,
        validationRules:{
          notEmpty:true,
        }
      },
    }
    
  };
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

  onChangeText = (input) =>{
    this.setState(prevState=> {
      return{
        controls:{
          ...prevState.controls,
          placeName: {
            ...prevState.controls.placeName,
            value: input,
            valid: validate(input,prevState.controls.placeName.validationRules),
            touched: true
          }
        }
      }
      
    });
  }

  placeAddedHandler = () =>{
    this.props.onAddPlace(this.state.controls.placeName.value)
  };

  render(){
    return(
      <ScrollView>
        <View style= {styles.container}>
          <MainText>
            <HeadingText>
              Share a places yo!
            </HeadingText>
          </MainText>

          <PickImageContainer/>
          <PickLocationContanier
            placeAddedHandler= {this.placeAddedHandler}
          />
          <PlaceInput
            placeholder = 'yo, where are u at!?'
            onChangeText = {this.onChangeText}
            placeData = {this.state.controls.placeName}
          />
          <Button
            title= 'comparte una zona'
            onPress = {this.placeAddedHandler}
            disabled= {!this.state.controls.placeName.valid}
          />
          
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center'
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName) => dispatch(addPlace(placeName))
  };
};

export default connect(null, mapDispatchToProps ) (SharePlaceScreen);