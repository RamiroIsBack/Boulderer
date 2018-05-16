import React,{Component} from 'react';
import {View,Text,Button, Image, ScrollView , StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {addPlace} from '../../store/actions';
import HeadingText from '../UI/HeadingText';
import MainText from '../UI/MainText';
import PickImageContainer from '../containers/PickImageContainer';
import PickLocationContanier from '../containers/PickLocationContainer';
import PlaceInput from '../presentational/placeInput';

class SharePlaceScreen extends Component {
  state = {
    placeName:'',
    
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
    this.setState({placeName:input});
  }

  placeAddedHandler = () =>{
    if(this.state.placeName.trim() !== ''){
      this.props.onAddPlace(this.state.placeName)
    }
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
            placeName = {this.state.placeName}
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