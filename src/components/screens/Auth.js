import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';
import {connect} from 'react-redux';
import {tryAuth} from '../../store/actions/authActions';
import startMainTabs from './MainTabs/startMainTabs';
import DefaultInput from '../UI/DefaultInput';
import HeadingText from '../UI/HeadingText';
import MainText from '../UI/MainText';
import ButtonWithBackground from '../UI/CustomButton';

import loginMutation from '../../mutations/Login'

import backgroundImage from '../../assets/knee_tatoo.jpg';
import validate from '../../utility/validation';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

class AuthScreen extends Component {
  state = {
    viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
    authMode: 'login',
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
      confirmPassword: {
        value: '',
        valid: false,
        validationRules: {
          equalTo: 'password'
        },
        touched:false,
      }
    }
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

  loginHandler = () => {
    this.props.onLogin({
      email:this.state.controls.email.value,
      password: this.state.controls.password.value,
    })
    startMainTabs();
  };
  swithcAuthModeHandler = () =>{
    this.setState((prevState)=>{
      return{
        authMode: prevState.authMode === 'login'? 'signup' : 'login'
      };
    });
    console.log(this.props);
  }

  updateInputState = (key, value) => {
    let connectedValue = {};
    if (this.state.controls[key].validationRules.equalTo) {
      const equalControl = this.state.controls[key].validationRules.equalTo;
      const equalValue = this.state.controls[equalControl].value;
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      };
    }
    if (key === 'password') {
      connectedValue = {
        ...connectedValue,
        equalTo: value
      };
    }
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          confirmPassword: {
            ...prevState.controls.confirmPassword,
            valid:
              key === 'password'
                ? validate(
                    prevState.controls.confirmPassword.value,
                    prevState.controls.confirmPassword.validationRules,
                    connectedValue
                  )
                : prevState.controls.confirmPassword.valid
          },
          [key]: {
            ...prevState.controls[key],
            value: value,
            valid: validate(
              value,
              prevState.controls[key].validationRules,
              connectedValue
            ),
            touched:true,
          }
        }
      };
    });
  };

  render() {
    let headingText = null;
    let confirmControl = null;
    if (this.state.viewMode === 'portrait') {
      headingText = (
        <MainText>
          <HeadingText>Please Log In</HeadingText>
        </MainText>
      );
    }
    if(this.state.authMode === 'signup'){
      confirmControl= (
        <View
          style={
            this.state.viewMode === 'portrait'
              ? styles.portraitPasswordWrapper
              : styles.landscapePasswordWrapper
          }
        >
          <DefaultInput
            placeholder='Confirm Password'
            style={styles.input}
            value={this.state.controls.confirmPassword.value}
            onChangeText={val => this.updateInputState('confirmPassword', val)}
            valid = {this.state.controls.confirmPassword.valid}
            touched = {this.state.controls.confirmPassword.touched}
          />
        </View>
      );
    }
    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <KeyboardAvoidingView 
          style={styles.container}
          behavior = 'padding'
        >
          {headingText}
          <ButtonWithBackground color='#29aaf4' onPress={this.swithcAuthModeHandler}>
            {this.state.authMode === 'login'? 'apuntate!': 'loguearte' }
          </ButtonWithBackground>
          <TouchableWithoutFeedback
            onPress = {Keyboard.dismiss}
          >
            <View style={styles.inputContainer}>
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
                  this.state.viewMode === 'portrait' ||this.state.authMode ==='login'
                    ? styles.portraitPasswordContainer
                    : styles.landscapePasswordContainer
                }
              >
                <View
                  style={
                    this.state.viewMode === 'portrait' ||this.state.authMode ==='login'
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

                {confirmControl}

              </View>
            </View>
          </TouchableWithoutFeedback>
          
          <ButtonWithBackground 
            color='#29aaf4' 
            onPress={this.loginHandler}
            disabled={
              !this.state.controls.email.valid ||
              !this.state.controls.password.valid ||
              !this.state.controls.confirmPassword.valid && this.state.authMode ==='signup'
            }
          >
            a blokar!
          </ButtonWithBackground>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backgroundImage: {
    width: '100%',
    flex: 1
  },
  inputContainer: {
    width: '80%'
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
  }
});
const mapDispatchToProps = dispatch =>{
  return{
    onLogin : (authData) => dispatch(tryAuth(authData)),
  }
}


export default connect(null,mapDispatchToProps) (graphql(loginMutation) (AuthScreen));
