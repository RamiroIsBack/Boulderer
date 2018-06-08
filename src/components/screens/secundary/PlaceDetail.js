import React , {Component} from 'react';
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
import MapView from 'react-native-maps';

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
    console.log(this.props)
    this.props.mutate({
      variables:{
        nombre: this.props.selectedPlace.name,
        content: this.props.selectedPlace.location.longitude+' - '+this.props.selectedPlace.location.latitude,
        photos: this.props.selectedPlace.image,
        areaId: '5b152c08e6123c0251d9270b',
        userId: '5b0812428e378f1474d02d02' ,

      },
      //refetchQueries:()=> [{query:currentUserQuery}]
    }).catch(err=>{
      const errors = err.graphQLErrors.map(err => err.message);
      console.log(errors);
    })
    //variables
// {
//   "nombre": "prueba",
//   "content": "q t cagas",
//   "photos": "ddddddddddddddd",
//   "areaId":"5b152c08e6123c0251d9270b",
// 	"userId":"5b0812428e378f1474d02d02",
// }
    console.log(
      
      this.props.selectedPlace.location
      )
    // this.props.onDeletePlace(this.props.selectedPlace.key);
    // this.props.navigator.pop();
  };
  render() {
    if(!this.props.data){
      return;
    }
    if(this.props.data.loading){
      return <Text>Loading...</Text>
    }
    let image = null;
    let imagesReady = false;
    if (imagesReady ===true){
      image= (
        <Image
          source={this.props.selectedPlace.image}
          style={styles.placeImage}
        />
      )
    }
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
          >
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
            <TouchableOpacity onPress={this.placeDeletedHandler}>
              <View style={styles.deleteButton}>
                <Icon
                  size={30}
                  name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                  color='red'
                />
              </View>
            </TouchableOpacity>
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
  deleteButton: {
    alignItems: 'center'
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

const mapDispatchToProps = dispatch => {
  return {
    onDeletePlace: (key) => dispatch(deletePlace(key)),

  };
};

export default connect(null, mapDispatchToProps)(
  graphql(currentUserQuery) (
    graphql(getSingleAreaQuery)(placeDetail)
  )
);