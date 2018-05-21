import React, {Component} from 'react';
import {TouchableOpacity, View,Text,StyleSheet,Animated} from 'react-native';
import {connect} from 'react-redux'
import {deletePlace} from '../../store/actions'
import ShowPlacesContainer from '../containers/ShowPlacesContainer'

class FindPlaceScreen extends Component {
  static navigatorStyle = {
    navBarButtonColor : 'blue'
  }
  state= {
    placesLoaded:false,
    removeAnim : new Animated.Value(1),
    placesAnim : new Animated.Value(0)
  }

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
  placesSearchHandler=()=>{
    Animated.timing(this.state.removeAnim,{
      toValue:0,
      duration:500,
      useNativeDriver:true,
    }).start(()=>{
      this.setState({placesLoaded:true});
      this.placesLoadedHandler();
    });
  }
  placesLoadedHandler= ()=>{
    Animated.timing(this.state.placesAnim,{
      toValue:1,
      diration:800,
      useNativeDriver:true,
    }).start();
  }
  render(){

    let content= (
      <Animated.View
        style= {{
          opacity: this.state.removeAnim,
          transform:[
            {
              scale:this.state.removeAnim.interpolate({
                inputRange:[0,1],
                outputRange: [12,1]
              })
            }
          ]
        }}
      >
        <TouchableOpacity onPress= {this.placesSearchHandler}>
          <View style = {styles.searchButtonContainer}>
            <Text style = {styles.searchButtonText}>press here if u dare</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
    if(this.state.placesLoaded){
      content = (
        <Animated.View
          style= {{
            opacity: this.state.placesAnim,
            
          }}
        >
          <ShowPlacesContainer
            placesList = {this.props.places}
            onItemSelected = {this.itemSelectedHandler}
          />
        </Animated.View>
      );
    }

    return(
      <View style= {this.state.placesLoaded? null : styles.buttonContainer}>
        {content}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  searchButtonContainer:{
    borderColor:'blue',
    borderWidth:3,
    borderRadius:50,
    padding:20,
  },
  searchButtonText:{
    color: 'blue',
    fontWeight: 'bold'
  },
  buttonContainer:{
    flex:1,
    justifyContent: 'center',
    alignItems:'center'
  }
})

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