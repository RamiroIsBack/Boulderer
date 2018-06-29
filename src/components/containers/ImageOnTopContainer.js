import React, {Component} from 'react'
import {Dimensions,TouchableOpacity,StyleSheet,View,ImageBackground,Text,Image} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
class ImageOnTop extends Component{
  constructor(props){
    super(props);
    
    Dimensions.addEventListener('change', this.updateStyles);
    this.state = {
      viewMode : 'portrait',
      showLine: true,
      radioTypes: [
        {label: 'mostrar linea', value: 0 },
        {label: 'Solo foto', value: 1 }
      ]
    }
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.updateStyles);
  }
  updateStyles = dims => {
    this.setState({
      viewMode: dims.window.height > 500 ? 'portrait' : 'landscape'
    });
  };
  swithcAuthModeHandler = () =>{
    this.setState((prevState)=>{
      return{
        showLine: prevState.showLine === true? false : true
      };
    });
  }
  render(){
    let line = null;
    if (this.state.showLine){
      line = (
        <Image
        style={styles.image}
        source= {{ uri: `data:image/jpeg;base64,${this.props.lineImage}` }}
        resizeMode= 'contain'
        />
      );
    }
    
    return(
      <View style = {styles.container}>
        <View style = {styles.imageContainer}>
          <ImageBackground
            style={styles.backgroundImage}
            source= {{ uri: `data:image/jpeg;base64,${this.props.image}` }}
            resizeMode= {this.state.viewMode === 'portrait'?'contain':'contain'}
          >
           {line}
          </ImageBackground>
        </View>
        <RadioForm
          radio_props={this.state.radioTypes}
          initial={0}
          formHorizontal={true}
          labelHorizontal={false}
          labelStyle = {styles.label}
          buttonColor={'#2196f3'}
          animation={true}
          onPress={this.swithcAuthModeHandler}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer:{
    height: 220,
    width:'100%'
  },
  backgroundImage:{
    
      flex: 1,
      alignSelf: 'stretch',
      width: undefined,
      height: undefined,
  },
  image:{
    flex: 1,
      alignSelf: 'stretch',
      width: undefined,
      height: undefined,
  },
  label:{
    fontWeight:'bold',
    color:'#2196f3',
    fontSize:12,
  }
});

export default ImageOnTop;