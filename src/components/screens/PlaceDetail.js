import React , {Component} from 'react';
import { Platform, TouchableOpacity, View, Image, Text, Button, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import { deletePlace } from '../../store/actions'

class placeDetail extends Component {
  onDeletePlace= () => {
    this.props.onDeletePlace(this.props.selectedPlace.key);
    this.props.navigator.pop();
  }
  render() {
    return (

      <View style={styles.container}>
        <View>
          <Image
            style={styles.placeImage}
            source={this.props.selectedPlace.image}
          />
          <Text
            style={styles.placeName}
          >{this.props.selectedPlace.name}</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={this.onDeletePlace}>
            <View style={styles.trashContainer}>
              <Icon
                size={30}
                name={Platform.OS==='android'?'md-trash':'ios-trash'}
                color='red'
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 22
  },
  placeImage: {
    width: '100%',
    height: 200
  },
  placeName: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  trashContainer: {
    alignItems: 'center',

  }
});

const mapDispatchToProps = dispatch => {
  return {
    onDeletePlace: (key) => dispatch(deletePlace(key)),

  };
};

export default connect(null, mapDispatchToProps)(placeDetail);