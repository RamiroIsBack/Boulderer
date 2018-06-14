import React from 'react';
import { View, Text , StyleSheet} from 'react-native';
import {Navigation} from 'react-native-navigation';
import CustomButton from '../UI/CustomButton';
import {startMainTabs} from '../screens/startScreens';

const errorHandler = (move) =>{
  if(move ==='bloke'){
    //TODO:: llevar solo a la pantalla de editarBloke
  }
  if(move ==='noUser'){
    startMainTabs();
    Navigation.dismissLightBox();
  }
}
const ErrorLightBox = props => {
  let body = null;
  switch (props.errorType) {
    case 'conection':
      body = (
        <View style = {styles.container}>
          <Text>{props.errorMessage}</Text>
          <Text>no te has podido loguear,</Text>
          <Text>Cierra esta ventana y vuelve a intentarlo</Text>
          <Text>necesitas internet para casi todo</Text> 
          <Text>pero puedes guardar un bloque</Text> 
          <Text>y subirlo mas tarde :)</Text>
          <CustomButton 
            color='#29aaf4' 
            onPress={()=>{errorHandler('bloke')}}
          >
          editar bloke
          </CustomButton>
        </View>
      )
      break;
    case 'credentials':
      body=(
        <View style = {styles.container}>
          <Text>{props.errorMessage}</Text>
          <Text>{props.errorRealMessage}</Text>
          <Text>no te has podido loguear,</Text>
          <Text>Cierra esta ventana y vuelve a intentarlo</Text>
          <Text>O, entra sin loguearte,</Text> 
          <Text>no podras subir ni comentar bloques,</Text> 
          <Text>siempre puedes loguearte mas tarde :)</Text>
          <CustomButton 
            color='#29aaf4' 
            onPress={()=>{errorHandler('noUser')}}
          >
          entrar
          </CustomButton>
        </View>
      )
      break;
    
    default:
      body = null;
  }
  return(body);
  
  
}

const styles = StyleSheet.create({
  container:{
    margin:5,
    padding:25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'white',
    borderColor:'black',
    borderRadius: 10
  }
})
export default ErrorLightBox;