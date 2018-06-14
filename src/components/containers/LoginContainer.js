import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {Navigation} from 'react-native-navigation';
import {View,StyleSheet} from 'react-native';
import loginMutation from '../../mutations/Login';
import currentUserQuery from '../../queries/CurrentUser';
import EmailPasswordForm from '../presentational/EmailPasswordForm';

class LoginContainer extends Component {
  state= {
    errors:[]
  }
  loginHandler = ({email,password}) => {
    this.props.mutate({
      variables:{email , password},
      refetchQueries:()=> [{query:currentUserQuery}]
    }).catch(err=>{
      let error= {errorType: '',errorMessage: '',errorRealMessage: err.message}
      if(err.graphQLErrors.length>0){
        //errors = err.graphQLErrors.map(err => err.message);
        error= {
          ...error,
          errorType:'credentials',
          errorMessage:'hay algun error en los datos',
          
        }
      }
      if (err.networkError){
        //errors[0] = 'hay un error de conexion, intenta logearte mas tarde';
        error = {
          ...error,
          errorType:'conection',
          errorMessage:'hay un error de conexion' , 
        }
      }
      Navigation.showLightBox({
        screen: 'bloka.ErrorLightBox', // unique ID registered with Navigation.registerScreen
        passProps: error, // simple serializable object that will pass as props to the lightbox (optional)
        style: {
          backgroundBlur: 'light', // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
          //backgroundColor: 'rgba(255, 255, 255, 0.1)', // tint color for the background, you can specify alpha here (optional)
          tapBackgroundToDismiss: true // dismisses LightBox on background taps (optional)
        }
      });
      //this.setState({ errors: errors}  );
      
    }).then((res)=>{
      if(res){
        this.props.onLogin({
         currentUser: res.data.login
        })   
      }
    })
  };
  render(){
    
    return(
      <View style={styles.formContainer}>
        
        <EmailPasswordForm
          authMode ='login'
          viewMode = {this.props.viewMode}
          loginHandler = {this.loginHandler}
          errors = {this.state.errors}
        />

      </View>
    );
  }
}
const styles = StyleSheet.create({
  formContainer:{
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    
  }
});

export default graphql (loginMutation) (LoginContainer)