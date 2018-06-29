import React , {Component} from 'react';
import {View, Text , StyleSheet, } from 'react-native';
import DefaultInput from '../UI/DefaultInput';
import ButtonWithBackground from '../UI/CustomButton';

import {validate} from '../../utility/validation';

class emailPasswordForm extends Component{
  state = {
    
    controls: {
      email: {
        value: '',
        valid: false,
        validationRules: {
          isEmail: true
        },
        touched:false,
      },
      password: {
        value: '',
        valid: false,
        validationRules: {
          minLength: 6
        },
        touched:false,
      },
      nombre: {
        value: '',
        valid: false,
        validationRules: {
          minLength: 3
        },
        touched:false,
      },
      
    }
  };

  updateInputState = (key, value) => {
    
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          errors:[],
          
          [key]: {
            ...prevState.controls[key],
            value: value,
            valid: validate(
              value,
              prevState.controls[key].validationRules
            ),
            touched:true,
          }
        }
      };
    });
  };

  mutationHandler = () =>{
    if(this.props.authMode === 'login'){
      this.props.loginHandler({
        email: this.state.controls.email.value,
        password: this.state.controls.password.value
      })
    }
    if(this.props.authMode === 'signup'){
      this.props.signupHandler({
        nombre: this.state.controls.nombre.value,
        email: this.state.controls.email.value,
        password: this.state.controls.password.value
      })
    }
  }

  render(){
    nombre = null;
    if(this.props.authMode ==='signup'){
      nombre = (
        <DefaultInput
          placeholder='nombre'
          style={styles.input}
          value={this.state.controls.nombre.value}
          onChangeText={val => this.updateInputState('nombre', val)}
          valid = {this.state.controls.nombre.valid}
          touched = {this.state.controls.nombre.touched}
          autoCorrect = {false}  
        />
      );
    }
    let errorList = (
      this.props.errors.map(error=>{
        return(
          // TODO:: instead of message make a message in spanish
        <View key = {error} style = {styles.errorContainer}>
          <Text style = {styles.errorText}>{error}</Text>
        </View>
        );
      })
    );
    return(

      <View style={styles.inputContainer}>
        {nombre}
        <DefaultInput
          placeholder='blokatoremail@aprieta.com'
          style={styles.input}
          value={this.state.controls.email.value}
          onChangeText={val => this.updateInputState('email', val)}
          valid = {this.state.controls.email.valid}
          touched = {this.state.controls.email.touched}
          autoCapitalize = 'none'
          autoCorrect = {false}
          keyboardType = 'email-address'
          />
        <View
          style={
            this.props.viewMode === 'portrait' ||this.props.authMode ==='login'
            ? styles.portraitPasswordContainer
            : styles.landscapePasswordContainer
          }
          >
          <View
            style={
              this.props.viewMode === 'portrait' ||this.props.authMode ==='login'
              ? styles.portraitPasswordWrapper
              : styles.landscapePasswordWrapper
            }
            >
            <DefaultInput
              placeholder='Password'
              style={styles.input}
              value={this.state.controls.password.value}
              onChangeText={val => this.updateInputState('password', val)}
              valid = {this.state.controls.password.valid}
              touched = {this.state.controls.password.touched}
              secureTextEntry
              />
          </View>
        </View>
        {errorList}
        <View style = {styles.buttonContainer}>
          <ButtonWithBackground 
            color='#29aaf4' 
            onPress={this.mutationHandler}
            disabled={
              !this.state.controls.email.valid ||
              !this.state.controls.password.valid ||
              !this.state.controls.nombre.valid && this.props.authMode ==='signup'
            }
          >
            a blokar!
          </ButtonWithBackground>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
  inputContainer: {
    width: '60%'
  },
  input: {
    backgroundColor: '#eee',
    borderColor: '#bbb'
  },
  landscapePasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  portraitPasswordContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  landscapePasswordWrapper: {
    width: '45%'
  },
  portraitPasswordWrapper: {
    width: '100%'
  },
  buttonContainer:{
    justifyContent: 'center', flexDirection: 'row'
  },
  errorContainer:{
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorText:{
    fontWeight:'bold',
    fontSize:22,
    color:'red'
  },
  
});

export default emailPasswordForm;


