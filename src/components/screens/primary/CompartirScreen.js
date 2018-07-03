import React, {Component} from 'react';
import {TouchableOpacity, View,Text,StyleSheet,Animated,Dimensions} from 'react-native';

class CompartirScreen extends Component {
  static navigatorStyle = {
    navBarButtonColor : 'blue'
  }
  state= {
    viewMode: 'portrait'
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

  onNavigatorEvent = (event) =>{
    if(event.type === 'NavBarButtonPress'){
      if(event.id === 'sideDrowerToggle'){
        this.props.navigator.toggleDrawer({
          side:'left',
          animated: true,
          
        });
      }
    }
  };

  selectionHandler= selection =>{
  
    if(selection ==='area' || selection === 'Area'){
      this.props.navigator.push({
        screen:'bloka.AddAreaScreen',
        title: 'Nueva Area',
      });
    }else {
      this.props.navigator.push({
        screen:'bloka.AddProblemScreen',
        title: 'Nuevo Bloke',
      });
    }
  
  }
  buttonAnime = title =>{
    return(
      <View style = {styles.buttonContainer}>
        
        <TouchableOpacity onPress= {()=>this.selectionHandler(title)}>
          <View style = {styles.searchButtonContainer}>
            <Text style = {styles.searchButtonText}>{title}</Text>
          </View>
        </TouchableOpacity>
      
      </View>
    );
  }
  render(){
    
    return(
      <View 
        style={[
          styles.container,
          this.state.viewMode === 'portrait'
            ? styles.portraitContainer
            : styles.landscapeContainer
        ]}>
        <View style= {styles.section}>
          {this.buttonAnime('Area')}
        </View>
        <View style= {styles.section}>
          {this.buttonAnime('Bloque')}
        </View>
      </View>

    );
  }
}
const styles = StyleSheet.create({
  container: {
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
    flex:1
  },
  searchButtonContainer:{
    borderColor:'blue',
    borderWidth:3,
    borderRadius:50,
    padding:20,
  },
  searchButtonText:{
    color: 'blue',
    fontWeight: 'bold'
  },
  buttonContainer:{
    flex:1,
    justifyContent: 'center',
    alignItems:'center'
  }
})
export default CompartirScreen;