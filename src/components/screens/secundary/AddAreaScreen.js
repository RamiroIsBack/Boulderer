import React, {Component} from 'react';
import {TouchableOpacity, View,Text,StyleSheet,Dimensions,ScrollView ,} from 'react-native';
import DefaultInput from '../../UI/DefaultInput';
import CustomButton from '../../UI/CustomButton';
import PickLocationContanier from '../../containers/PickLocationContainer';
import PickImageContainer from '../../containers/PickImageContainer';
import {graphql} from 'react-apollo';
import getAreasQuery from '../../../queries/GetAreas';
import AddAreaMutation from '../../../mutations/AddArea'
import AddImgMutation from '../../../mutations/AddImg'
import gql from 'graphql-tag';
import CurrentUser from '../../../queries/CurrentUser';

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
            valid: key==='description' && val.length>5? true : false ,
          }
        }
      }
    });
    if(key ==='nombre'){
      this.areaRepeated(val);
    }
  
  };
  subirAreaHandler=()=>{
    this.props.mutate({
      variables:{
        nombre: this.state.controls.nombre.value,
        description: this.state.controls.description.value,
        latitude:this.state.controls.location.value.latitude,
        longitude:this.state.controls.location.value.longitude,
        img:this.state.controls.image.value.base64,
        //data:this.state.controls.image.value.base64,
      },
      refetchQueries:()=> [{query:getAreasQuery}]
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
  contained=(str1,str2)=>{ 
    
    var regexAnd=str2.toUpperCase().split("").join(")(?=.*");
    var regexStr="^"+"(?=.*"+regexAnd+").*$";
    
    
    var re = new RegExp(regexStr,"gm");

    return re.test(str1.toUpperCase());

  }
  areaRepeated = (inputVal)=>{
    let inputName = inputVal;
    if(inputName && inputName.length>2 && !this.props.data.loading){
      let matches= [];
      let check = false;
      for (i = 0; i < this.props.data.areas.length; i++) {
        let area = this.props.data.areas[i]
        let result = this.contained(area.nombre, inputName);
        if(result){
          matches.push(
            <View style= {styles.formerAreaContainer}
              key= {this.props.data.areas[i].id}
            >
              <TouchableOpacity 
                onPress= {()=>this.gotoFormerArea(
                  area.id, area.nombre
                )}
              >
                <Text>{area.nombre}</Text>
              </TouchableOpacity>

            </View>
          )
          check = true;
        }
          
      }
      if (check){
        if(this.state.controls.nombre.valid){
          this.validateFields('nombre',false);
        }
        matches.push(<Text key= 'not repeating key :P'>no repitas areas :) mira a ver si alguna de estas te vale</Text>)
      }else{
        if(!this.state.controls.nombre.valid){
          this.validateFields('nombre',true);
        }
      }
      this.setState({matches});
    }
    else{ 
      if(!this.state.controls.nombre.valid){
        this.validateFields('nombre',true);
      }
      this.setState({matches:null});
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
          >
            Compartir nueva Area!!
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
            
            <View style={[styles.section,]}>  
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

export default graphql (AddAreaMutation) (
  
  graphql(getAreasQuery) (AddAreaScreen)
  
);