import React, {Component} from 'react';
import {connect} from 'react-redux';
import {TouchableOpacity, View,Text,StyleSheet,Dimensions,ScrollView ,} from 'react-native';
import DefaultInput from '../../UI/DefaultInput';
import CustomButton from '../../UI/CustomButton';
import PickLocationContanier from '../../containers/PickLocationContainer';
import PickImageContainer from '../../containers/PickImageContainer';
import {graphql} from 'react-apollo';
import getAreasQuery from '../../../queries/GetAreas';
import AddAreaMutation from '../../../mutations/AddArea'
import {Navigation} from 'react-native-navigation';
import {filterList} from '../../../utility/validation'
import {startMainTabs} from '../startScreens';



class AddAreaScreen extends Component {
  
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
      spinner:{
        value:'',
        active: true,          
      },
      res:null,
      errors:[]
    },
    viewMode: 'portrait',
    matches:null,
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
    if(key ==='nombre'){
      this.areaRepeated(val);
    }
  
  };
  finishingAddingNewArea=(done)=>{
    console.log(done);
    if(this.state.controls.res){
      this.gotoFormerArea(this.state.controls.res.data.addArea.id,this.state.controls.res.data.addArea.nombre);
    }else{
      //TODO:: darle la opcion de guardarlo en la memoria del tlf
      startMainTabs();

    }

  }
  preMutation= ()=>{
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          nombre:{ value:'', valid:false, touched:false },
          spinner:{ value:'', active: true }
        }
      }
    });
    this.openSpinnerModal();
  }
  openSpinnerModal=()=>{
    Navigation.showModal({
      screen: 'bloka.SpinnerModal', 
      passProps: {
        finishingAddingNewArea:(done)=>this.finishingAddingNewArea(done),
        spinner: this.state.controls.spinner
      }, 
      animationType: 'slide-up'
    });
  }
  subirAreaHandler=()=>{
    //show a spinner in a lightbox
    this.preMutation();
    this.props.mutate({
      variables:{
        nombre: this.state.controls.nombre.value,
        description: this.state.controls.description.value,
        latitude:this.state.controls.location.value.latitude,
        longitude:this.state.controls.location.value.longitude,
        img:this.state.controls.image.value.base64,
        userId: this.props.users.currentUser.id
      },
      refetchQueries:()=> [{query:getAreasQuery}]
    }).catch(err=>{
      const errors = err.graphQLErrors.map(err => err.message);
      this.setState(prevState => {
        return {
          controls: {
            ...prevState.controls,
            errors: errors,
            spinner:{ value:'ha habido un error al guardar la zona, vuelve a intentarlo mas tarde', active: false }
            }
          }
        }
      );
      Navigation.dismissModal({animationType: 'slide-down'
      }).catch((err)=>{
        console.log('error al cerrar modal spinner')
      }).then((res)=>{
        this.openSpinnerModal();  
      });
      console.log(this.state.controls.errors)
    }).then((res)=>{
      if(res){
        console.log(res);
        //show the success in the light box, close it , and go to the new created Area
        this.setState(prevState => {
          return {
            controls: {
              ...prevState.controls,
              spinner:{ value:'se ha guardado la zona con exito', active: false },
              res
            }
          }
        });
        Navigation.dismissModal({animationType: 'slide-down'
        }).catch((err)=>{
          console.log('error al cerrar modal spinner')
        }).then((res)=>{
          this.openSpinnerModal();  
        });
        
      }
    })

  }
  
  areaRepeated = (inputVal)=>{
    let inputName = inputVal;
    if(inputName && inputName.length>2 && !this.props.data.loading){
      let matches=[]
      let listFiltered= filterList(this.props.data.areas,inputName);
      if(listFiltered.length > 0){
        if(this.state.controls.nombre.valid){
          this.validateFields('nombre',false);
        } 
        matches = listFiltered.map(area =>
          <View style= {styles.formerAreaContainer}
          key= {area.id}   
          >
              <TouchableOpacity
                id = {area.id}
                nombre = {area.nombre}
                onPress= {()=>this.gotoFormerArea(area.id,area.nombre)}>
                <Text>{area.nombre}</Text>
              </TouchableOpacity>
  
            </View>
        )
        matches.push(<Text key= 'not repeating key :P'>no repitas areas :) mira a ver si alguna de estas te vale</Text>)
        
        this.setState({matches});
      }else{
        if(!this.state.controls.nombre.valid){
          this.validateFields('nombre',true);
        }
        this.setState({matches:null});
      }
    }
    else{ 
      if(!this.state.controls.nombre.valid){
        this.validateFields('nombre',true);
      }
      if(this.state.matches !==null){
        this.setState({matches:null});
      }
    }
    
  }
  gotoFormerArea=(id,nombre) =>{
    this.props.navigator.push({
      screen:'bloka.PlaceDetailScreen',
      title: nombre,
      passProps:{
        areaId: id
      }
    });
  }

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
   
  }
  
  render(){
    return(
      <View style= {styles.container}>
        <View style= {styles.mutationButton}> 
          <CustomButton
            color='#29aaf4' 
            onPress={this.subirAreaHandler}
            disabled={
              !this.state.controls.nombre.valid ||
              !this.state.controls.description.valid ||
              !this.state.controls.location.valid ||
              !this.state.controls.image.valid 
            }
            message = 'Compartir nueva Area!!'>
          </CustomButton>
        </View>
        <ScrollView>
          <View
          style={[
            styles.scrollContainer,
                this.state.viewMode === 'portrait'
                  ? styles.portraitContainer
                  : styles.landscapeContainer
              ]}>
            
            <View style={[styles.section,]}>  
              <View 
                style={[
                  styles.section,
                      this.state.viewMode === 'portrait'
                        ? styles.portraitSection
                        : styles.landscapeSection
                    ]}>  
                <View style= {styles.nombreBlock}>  
                    
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
                  
                  {this.state.matches}
                  
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
                <PickImageContainer
                  onImagePicked = {this.imagePickedHandler}
                />
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
  formerAreaContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    borderColor:'black',
    borderWidth:1,
    padding:2,
    margin:2,
    
  }
});
mapStateToProps= state => {
  return{
    users:state.users
  };
};
export default connect(mapStateToProps,null) (
  graphql (AddAreaMutation) (
    graphql(getAreasQuery) (AddAreaScreen)
  )
);