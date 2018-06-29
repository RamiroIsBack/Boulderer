import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Navigation} from 'react-native-navigation';
import {TouchableOpacity, View,Text,StyleSheet,Dimensions,ScrollView, Platform} from 'react-native';
import DefaultInput from '../../UI/DefaultInput';
import CustomButton from '../../UI/CustomButton';
import PickLocationContanier from '../../containers/PickLocationContainer';
import PickImageContainer from '../../containers/PickImageContainer';
import ImageOnTopContainer from '../../containers/ImageOnTopContainer';
import {graphql} from 'react-apollo';
import AddProblemMutation from '../../../mutations/AddProblem';
import Icon from 'react-native-vector-icons/Ionicons';
import MatchesContainer from '../../containers/MatchesContainer';

class AddProblemScreen extends Component {
  
  state= {
    controls:{
      nombre:{
        value:'',
        valid:true,
        touched:false,
      },
      location:{
        value:{
          latitude:null,
          longitude:null,
        },
        valid:false,
        touched:false,
      },
      description:{
        value:'' ,
        valid:false,
        touched:false,
      },
      image:{
        value:null,
        valid:false,
        touched:false,
      },
      lineImage:{
        value:null,
        valid:false,
        touched:false,
      },
      areaId:{
        value:null,
        valid:false,
        nombre: 'elige area'
      },
      errors:[]
    },
    viewMode: 'portrait',
    
  }

  constructor(props){
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
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

  validateFields=(key,valid) =>{
    this.setState(prevState=>{
      return{
        controls:{
          ...prevState.controls,
          [key]:{
            ...prevState.controls[key],
            valid,
          }
        }
      }
    })
  };
  
  updateInputState= (key, val)=>{
    
    this.setState(prevState =>{
      return{
        controls:{
          ...prevState.controls,
          [key]:{
            ...prevState.controls[key],
            value: val,
            touched:true,
            
          }
        }
      }
    });
    if (key === 'description'){
      this.validateFields(key,val.length>5? true : false )
    }
    
  
  };
  
  locationPickHandler = (location) =>{
    this.setState (prevState=>{
      return{
        controls:{
          ...prevState.controls,
          location:{
            value: location,
            valid:true,
          }
        }
      }
    });
  }
  imagePickedHandler = (imagePicked)=>{
    this.setState(prevState =>{
      return{
        controls:{
          ...prevState.controls,
          image:{
            value:imagePicked,
            valid:true
          }
        }
      }
    });
    Navigation.showModal({
      screen: 'bloka.ProblemSketchLightBox', // unique ID registered with Navigation.registerScreen
      title:'pinta por donde va el bloke',
      passProps: {imageSketched:(linesImage)=>this.imageSketched(linesImage), imagePicked }, // simple serializable object that will pass as props to the lightbox (optional)
      animationType: 'slide-up'
    });
  }
  imageSketched= (lineImage)=>{
    this.setState (prevState=>{
      return{
        controls:{
          ...prevState.controls,
          lineImage:{
            value: lineImage,
            valid:true,
          }
        }
      }
    });
  };

  areaSelected = (areaId,nombre) =>{
    this.setState (prevState=>{
      return{
        controls:{
          ...prevState.controls,
          areaId:{
            value: areaId,
            valid:true,
            nombre: nombre,
          },
          nombre:{
            value:'',
            valid:false
          }
        }
      }
    });
  }
  openAreaSelection = ()=>{
    Navigation.showLightBox({
      screen: 'bloka.AreaSelectionLightBox', // unique ID registered with Navigation.registerScreen
      passProps: {areaSelected:(areaId,areaNombre)=>this.areaSelected(areaId,areaNombre)}, // simple serializable object that will pass as props to the lightbox (optional)
      style: {
        backgroundBlur: 'light', // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
        //backgroundColor: 'rgba(255, 255, 255, 0.1)', // tint color for the background, you can specify alpha here (optional)
        tapBackgroundToDismiss: true // dismisses LightBox on background taps (optional)
      }
    });
  }
  subirProblemHandler = ()=>{
    this.props.mutate({
      variables:{
        nombre: this.state.controls.nombre.value,
        description: this.state.controls.description.value,
        latitude:this.state.controls.location.value.latitude,
        longitude:this.state.controls.location.value.longitude,
        img:this.state.controls.image.value.base64,
        line: this.state.controls.lineImage.value,//it's directly base64
        userId: this.props.users.currentUser.id,
        areaId:this.state.controls.areaId.value
      },
      
    }).catch(err=>{
      const errors = err.graphQLErrors.map(err => err.message);
      this.setState(prevState => {
        return {
          controls: {
            ...prevState.controls,
            errors: errors
            }
          }
        }
      );
      console.log(this.state.controls.errors)
    }).then((res)=>{
      if(res){
        console.log(res);
        
      }
    })
  }

  render(){
    let matches = null;
    let imageSituation = (
      <PickImageContainer
        onImagePicked = {this.imagePickedHandler}
      />
    );
    if(this.state.controls.lineImage.valid){
      imageSituation = (
        <ImageOnTopContainer
          image = {this.state.controls.image.value.base64}
          lineImage = {this.state.controls.lineImage.value}
        />
      );
      //TODO:: no me convence, elegir otra foto Button
    }
    if (this.state.controls.areaId.valid){
      matches= (
        <MatchesContainer
          areaId = {this.state.controls.areaId.value}
          inputVal = {this.state.controls.nombre.value}
          nombreValid = {this.state.controls.nombre.valid}
          validateFields = {this.validateFields}
          navigator = {this.props.navigator}
        />
      );
    }
    return(
      <View style= {styles.container}>
        <View style= {styles.mutationButton}> 
          <CustomButton
            color='#29aaf4' 
            onPress={this.subirProblemHandler}
            disabled={
              !this.state.controls.areaId.valid ||
              !this.state.controls.nombre.valid ||
              !this.state.controls.description.valid ||
              !this.state.controls.location.valid ||
              !this.state.controls.image.valid ||
              !this.state.controls.lineImage.valid
            }
          >
            Compartir nuevo bloke!!
          </CustomButton>
          />
        </View>
        <ScrollView>
          <View
          style={[
            styles.scrollContainer,
                this.state.viewMode === 'portrait'
                  ? styles.portraitContainer
                  : styles.landscapeContainer
              ]}
          >
            
            <View style={styles.section}>  
              <TouchableOpacity 
                  onPress= {this.openAreaSelection}
              >
                <View style= {styles.areaSelectionContainer}>
                  <Text>{this.state.controls.areaId.nombre}  </Text>
                  <Icon
                    size={30}
                    name={Platform.OS === 'android' ? 'md-arrow-dropdown' : 'ios-arrow-dropdown'}
                    color='red'
                    />
                </View>
              </TouchableOpacity>
              <View 
                style={[
                  styles.section,
                      this.state.viewMode === 'portrait'
                        ? styles.portraitSection
                        : styles.landscapeSection
                    ]}
              >  
                <View style= {styles.nombreBlock} >  
                    
                  <View style= {styles.nombreInputContainer}> 
                    <DefaultInput
                      placeholder='nombre'
                      style={styles.input}
                      value={this.state.controls.nombre.value}
                      onChangeText={val => this.updateInputState('nombre', val)}
                      valid = {this.state.controls.nombre.valid}
                      touched = {this.state.controls.nombre.touched}
                    />
                    
                  </View>
                </View>
                <View style= {styles.listaNombresBlock}>  
                  
                  {matches}
                  
                </View>
              </View> 

              <View style= {styles.section}>   
                <DefaultInput
                  placeholder='descripcion'
                  style={styles.input}
                  value={this.state.controls.description.value}
                  onChangeText={val => this.updateInputState('description', val)}
                  valid = {this.state.controls.description.valid}
                  touched = {this.state.controls.description.touched}
                />
              </View>
             
              <View style= {styles.section}>
                {imageSituation}
              </View>
            </View>
            <View style= {styles.section}>
              <PickLocationContanier
              locationPickHandler= {this.locationPickHandler}
              />
            </View>
            
          </View>
        </ScrollView>
      </View>

    );
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    
  },
  scrollContainer: {
    margin: 22,
    flex:1,
  },
  portraitContainer: {
    flexDirection: 'column'
  },
  landscapeContainer: {
    flexDirection: 'row'
  },
  section:{
    flex:1,
  },
  nombreBlock:{
    flex:1,
    marginRight:8
  },
  listaNombresBlock:{
    flex:1,
  },
  
  portraitSection:{
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  landscapeSection:{
    flexDirection: 'column'
  },

  nombreInputContainer:{
    flex:2
  },
  mutationButton:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  input:{ 
    backgroundColor:'white'
  },
 
  areaSelectionContainer:{
    padding:5,
    borderBottomColor:'black',
    borderBottomWidth:1,
   
    alignItems:'center',
    flexDirection:'row'

  },
});
mapStateToProps= state => {
  return{
    users:state.users
  };
};
export default connect(mapStateToProps,null) (
  graphql (AddProblemMutation) (AddProblemScreen)
);
