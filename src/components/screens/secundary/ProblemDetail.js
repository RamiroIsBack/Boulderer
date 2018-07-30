import React , {Component} from 'react';
import {Navigation} from 'react-native-navigation';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
  
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import {graphql} from 'react-apollo';
import getSingleProblemQuery from '../../../queries/GetSingleProblem';
import ImageOnTopContainer from '../../containers/ImageOnTopContainer';
import { deletePlace } from '../../../store/actions';

import MapView, { Marker } from 'react-native-maps';

class ProblemDetail extends Component {
  state = {
    viewMode: 'portrait',
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
      if(this.props.users.currentUser.id === this.props.data.problem.user.id){
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
  render() {
    if(!this.props.data){
      return;
    }
    if(this.props.data.loading){
      return <Text>Loading...</Text>
    }
    
    let problemMarker = (    
      <Marker
      coordinate={{latitude: this.props.data.problem.latitude, longitude:this.props.data.problem.longitude}}
      title={this.props.data.problem.nombre}
      description={this.props.data.problem.description}
      image={require('../../../assets/climbing-2.png')}
      key= {this.props.data.problem.id}
      id = {this.props.data.problem.id}
      >
      
      </Marker>     
    );
    
    return (
      <ScrollView>
        <View
        style={[
          styles.container,
          this.state.viewMode === 'portrait'
            ? styles.portraitContainer
            : styles.landscapeContainer
        ]}
        >
          <View style={styles.superContainer}>
            <ImageOnTopContainer
              image = {this.props.data.problem.photos[0].img}
              lineImage = {this.props.data.problem.photos[0].line}
            />
          </View> 
          <View style={styles.subContainer}>
            <MapView
              initialRegion={{
                latitude:this.props.data.problem.latitude,
                longitude: this.props.data.problem.longitude,
                latitudeDelta: 0.8,
                longitudeDelta:
                  Dimensions.get('window').width /
                  Dimensions.get('window').height *
                  0.8
              }}
              style={styles.map}
            >
              {problemMarker}
            </MapView>
          </View>
          
          <View style={styles.subContainer}>
            <View>
              <Text style={styles.placeName}>
                {this.props.data.problem.nombre}
              </Text>
            </View>
            <View>
              {this.giveMeUserOptions()}
            </View>
          </View>
        </View>
        <View style = {styles.container}>
          <Text>Coment</Text>
          <Text>Coment</Text>
          <Text>Coment</Text>
          <Text>Coment</Text>
          <Text>Coment</Text>
          <Text>Coment</Text>
          <Text>Coment</Text>
          <Text>Coment</Text>
        </View>
      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
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
    padding:10,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 28
  },
  map: {
    height:220,
    width:'100%'
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
  superContainer: {
    flex: 2
  },
  
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
  
  graphql(getSingleProblemQuery)(ProblemDetail)
  
);