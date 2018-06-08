import React, { Component } from 'react';
import {Platform, TouchableOpacity, View, Text, Dimensions, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons/';
import {startAuth} from './startScreens';
import {graphql} from 'react-apollo';
import logoutMutation from '../../mutations/Logout';
import currentUserQuery from '../../queries/CurrentUser';

import {connect} from 'react-redux';
import {tryAuth} from '../../store/actions/authActions';

class SideDrower extends Component {
  logoutHandler = ()=>{
    this.props.mutate({
      refetchQueries:()=> [{query:currentUserQuery}]
    }).then(()=>{
      this.props.navigator.toggleDrawer({
        side:'left',
        animated: true,
        
      });
    })
  }
  loginHandler = ()=>{
    
    if (!this.props.data.currentUser){
      startAuth();
    }else{
      alert(`ya est'as logeado con el email: ${this.props.data.currentUser.email}`);
    }
    this.props.navigator.toggleDrawer({
      side:'left',
      animated: true,
      
    });
  }
  render() {
    return (
      <View
      style={[
        styles.container,{ width: Dimensions.get('window').width * 0.8 }
          ]}
      >
        <TouchableOpacity
          onPress = {this.loginHandler}
        >
          <View style= {styles.drowerItem} >
            <Icon
              name= {Platform.OS==='android'?'md-log-in':'ios-log-in'}
              size = {30} color= 'green' style = {styles.drowerItemIcon}/>
            <Text>log In</Text>
          </View>
        </TouchableOpacity>  
        <TouchableOpacity
          onPress = {this.logoutHandler}
        >  
          <View style= {styles.drowerItem} >  
            <Icon 
              name={Platform.OS==='android'?'md-log-out':'ios-log-out'}
              size = {30} color= 'red'  style = {styles.drowerItemIcon}/>
            <Text>log Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: '#eee',
    flex: 1,
  },
  drowerItem:{
    flexDirection:'row',
    alignItems: 'center',
    padding: 10
  },
  drowerItemIcon:{
    paddingRight:10,
  }
})

const mapStateToProps= state=>{
  return{ users: state.users }
  
}
const mapDispatchToProps = dispatch =>{
  return{
    onLogin : (authData) => dispatch(tryAuth(authData)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (
  graphql (currentUserQuery) (
    graphql(logoutMutation)(SideDrower)
  )
);
