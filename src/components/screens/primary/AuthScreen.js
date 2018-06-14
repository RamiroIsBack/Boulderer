import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import currentUserQuery from '../../../queries/CurrentUser';
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
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import backgroundImage from '../../../assets/auth_pic3.png';
//import backgroundImage from '../../../assets/knee_tatoo.jpg';
import {connect} from 'react-redux';
import {tryAuth} from '../../../store/actions/authActions';
import SignupContainer from '../../containers/SignupContainer';
import LoginContainer from '../../containers/LoginContainer';
import {startMainTabs} from '../startScreens';
import HeadingText from '../../UI/HeadingText';
import MainText from '../../UI/MainText';

class AuthScreen extends Component {
  state = {
    viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
    authMode: 'login',
    radioTypes: [
      {label: 'Logearme', value: 0 },
      {label: 'Soy nuevo', value: 1 }
    ]
  }
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

  logedIn = currentUser =>{
    this.props.logedIn({ currentUser })  //both signup and login
  }

  swithcAuthModeHandler = () =>{
    this.setState((prevState)=>{
      return{
        authMode: prevState.authMode === 'login'? 'signup' : 'login'
      };
    });
    console.log(this.props);
  }
  render(){
    let headingText = null;
    let confirmControl = null;
    if (this.state.viewMode === 'portrait') {
      headingText = (
        <MainText>
          <HeadingText>Aprieta!!</HeadingText>
        </MainText>
      );
    }
    let login,signup = null;
    if(this.state.authMode ==='login'){
      login = (
        <LoginContainer
          onLogin= {this.logedIn}
          viewMode= {this.state.viewMode}
        />
      )
    }else{
      signup = (
        <SignupContainer
          onSignup= {this.logedIn}
          viewMode= {this.state.viewMode}
        />
    )
    }
    let wholeForm = null;
    if (!this.props.data.loading){
      if (!this.props.data.currentUser ){
        wholeForm= (
          
          <KeyboardAvoidingView 
            style={styles.container}
            behavior = 'padding'
          >
            <View style = {styles.headersContainer}>  
              {headingText}
              
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
            <TouchableWithoutFeedback
              onPress = {Keyboard.dismiss}
            >
              <View style = {styles.formContainer}>
                {login}
                {signup}                
              </View>

            </TouchableWithoutFeedback>
          
          </KeyboardAvoidingView> 
        )   
      }else{
        console.log('sacame de aqui wey!')
        startMainTabs();
        this.props.logedIn(this.props.data.currentUser);
      }
    }
    return(
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        {wholeForm}     
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
  headersContainer:{
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    borderRadius: 10,
    padding: 10,
    paddingTop:2
  },
  formContainer: {
    flex: 1,
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'yellow'
  },
  label:{
    fontWeight:'bold',
    color:'#2196f3',
    fontSize:18,
  }
})

const mapDispatchToProps = dispatch =>{
  return{
    logedIn : (currentUser) => dispatch(tryAuth(currentUser)),
  }
}


export default connect(null,mapDispatchToProps) (
  
    graphql(currentUserQuery) (AuthScreen)
  
);
