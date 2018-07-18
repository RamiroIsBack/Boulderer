import React , {Component} from 'react';
import {Navigation} from 'react-native-navigation';
import {
  View,
  Image,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import {graphql} from 'react-apollo';
import addProblemMutation from '../../../mutations/AddProblem';
import currentUserQuery from '../../../queries/CurrentUser';
import getSingleAreaQuery from '../../../queries/GetSingleArea';

import { deletePlace } from '../../../store/actions';
import MapView, { Marker , Callout} from 'react-native-maps';

class placeDetail extends Component {
  state = {
    viewMode: 'portrait'
  };

  constructor(props) {
    super(props);
    Dimensions.addEventListener('change', this.updateStyles);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.updateStyles);
  }

  updateStyles = dims => {
    this.setState({
      viewMode: dims.window.height > 500 ? 'portrait' : 'landscape'
    });
  };

  placeDeletedHandler = () => {
    for (let problem in this.props.data.area.problems) {

      if (problem.userId !== this.props.users.currentUser.id){
        alert ('no puedes eliminar la zona. otros escaladores han subido bloques. Ahora pertenece al mundo :P')
        return false;
      }
    }
    Navigation.showLightBox({
      screen: 'bloka.DeleteAreaLightBox', // unique ID registered with Navigation.registerScreen
      passProps: {areaId: this.props.data.area.id}, // simple serializable object that will pass as props to the lightbox (optional)
      style: {
        backgroundBlur: 'light', // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
        //backgroundColor: 'rgba(255, 255, 255, 0.1)', // tint color for the background, you can specify alpha here (optional)
        tapBackgroundToDismiss: true // dismisses LightBox on background taps (optional)
      }
    });

      
  };
  goToEditHandler= () =>{
    //do that 
  }
  giveMeUserOptions= ()=>{
    if(this.props.users.currentUser){
      if(this.props.users.currentUser.id === this.props.data.area.user.id){
        return(
          <View style = {styles.editButtons}>
            <TouchableOpacity onPress={this.placeDeletedHandler} >
              <View style={styles.deleteButton}>
                <Icon
                  size={30}
                  name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                  color='red'
                  />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.goToEditHandler}>
              <View style={styles.deleteButton}>
                <Icon
                  size={30}
                  name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                  color='red'
                  />
              </View>
            </TouchableOpacity>
          </View>
        )
      }
    }
  }
  callOutPressHandler=(id,nombre)=>{
    this.props.navigator.push({
      screen:'bloka.ProblemDetailScreen',
      title: nombre,
      passProps:{
        problemId: id
      }
    });
  }
  workaroundForAndroid = (areaId,areaNombre) =>{
    if(Platform.OS === 'android'){
      this.callOutPressHandler(areaId,areaNombre)
        
    }else{
      //IOS gets the clic on the Callout no problem
    }
  }
  render() {
    if(!this.props.data){
      return;
    }
    if(this.props.data.loading){
      return <Text>Loading...</Text>
    }
    
    let image= (
        <Image
          source={{ uri: `data:image/jpeg;base64,${this.props.data.area.photos[0].img}` }} 
          style={styles.placeImage}
        />
    );
    problemMarkers = null;
    if (this.props.data.area.problems.length !==0){
      problemMarkers = (
        this.props.data.area.problems.map(problem => (
          <Marker
          coordinate={{latitude: problem.latitude, longitude:problem.longitude}}
          title={problem.nombre}
          description={problem.description}
          image={require('../../../assets/climbing-2.png')}
          key= {problem.id}
          id = {problem.id}
          onPress= {()=>this.workaroundForAndroid(problem.id,problem.nombre)}>
          <Callout>
            <TouchableOpacity onPress= {()=>this.callOutPressHandler(problem.id,problem.nombre)}
              
              id= {problem.id}
            >
              <View style={styles.calloutText}>
                <Text style = {{fontWeight:'bold'}}>{problem.nombre}</Text>
                <Text>{problem.description}</Text>
              </View>
            </TouchableOpacity>
          </Callout>
          </Marker>
        ))
      );
    }
    return (
      <View
        style={[
          styles.container,
          this.state.viewMode === 'portrait'
            ? styles.portraitContainer
            : styles.landscapeContainer
        ]}
      >
        <View style={styles.placeDetailContainer}>
          <View style={styles.placeholder}>
            {image}
          </View>
          <View style={styles.subContainer}>
            <MapView
              initialRegion={{
                latitude:this.props.data.area.latitude,
                longitude: this.props.data.area.longitude,
                latitudeDelta: 0.8,
                longitudeDelta:
                  Dimensions.get('window').width /
                  Dimensions.get('window').height *
                  0.8
              }}
              style={styles.map}
            >
             {problemMarkers}
            </MapView>
          </View>
        </View>
        <View style={styles.subContainer}>
          <View>
            <Text style={styles.placeName}>
              {this.props.data.area.nombre}
            </Text>
          </View>
          <View>
            {this.giveMeUserOptions()}
          </View>
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 22,
    flex:1,
  },
  portraitContainer: {
    flexDirection: 'column'
  },
  landscapeContainer: {
    flexDirection: 'row'
  },
  placeDetailContainer: {
    flex: 2
  },
  placeImage: {
    width: '100%',
    height: '100%'
  },
  placeName: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 28
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  editButtons:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center'
    
  },
  deleteButton: {
    alignItems: 'center',
    padding:10,
  },
  subContainer: {
    flex: 1
  },
  placeholder:{
    flex:1,
    borderWidth :1,
    borderColor:'black',
    backgroundColor:'#eee',
  }
});

mapStateToProps= state => {
  return{
    users:state.users
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onDeletePlace: (key) => dispatch(deletePlace(key)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  
  graphql(getSingleAreaQuery)(placeDetail)
  
);