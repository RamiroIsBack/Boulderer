import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {Navigation} from 'react-native-navigation';
import {View,StyleSheet} from 'react-native';
import signupMutation from '../../mutations/Signup';
import EmailPasswordForm from '../presentational/EmailPasswordForm';
import currentUserQuery from '../../queries/CurrentUser';

class SignupContainer extends Component {
  state= {
    errors:[]
  }
  signupHandler = ({nombre, email,password}) => {
    this.props.mutate({
      variables:{nombre , email , password},
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
        this.props.onSignup({
         currentUser: res.data.signup
        })   
      }
    })
  };

  render(){
    return(
      <View style={styles.formContainer}>
        
        <EmailPasswordForm
          authMode ='signup'
          viewMode = {this.props.viewMode}
          signupHandler = {this.signupHandler}
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

export default graphql (signupMutation) (SignupContainer)