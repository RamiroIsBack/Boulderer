import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {Navigation} from 'react-native-navigation';
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native';
import getProblemsInAreaQuery from '../../queries/GetProblemsInArea';
import {contained} from '../../utility/validation'

class MatchesContainer extends Component {
  state= {
    errors:[],
    
    matches:null
  }
  componentWillReceiveProps(nextProps){
    
    if(this.props.inputVal !== nextProps.inputVal){
      this.problemRepeated(nextProps.inputVal)
    }
  }
  problemRepeated = (inputVal)=>{
    let inputName = inputVal;
    if(inputName && inputName.length>2 && !this.props.data.loading){
      let matches= [];
      let check = false;
      for (i = 0; i < this.props.data.area.problems.length; i++) {
        let problem = this.props.data.area.problems[i]
        let result = contained(problem.nombre, inputName);
        if(result){
          matches.push(
            <View style= {styles.formerProblemContainer}
              key= {i}
            >
              <TouchableOpacity 
                onPress= {()=>this.gotoFormerProblem(
                  problem.id, problem.nombre
                )}
              >
                <Text>{problem.nombre}</Text>
              </TouchableOpacity>

            </View>
          )
          check = true;
        }
          
      }
      if (check){  
        if(this.props.nombreValid){
          this.props.validateFields('nombre',false);
        }
        matches.push(<Text key= 'not repeating key :P'>no repitas blokes :) mira a ver si alguno de estos te vale</Text>)
      }else{
        if(!this.props.nombreValid){
          this.props.validateFields('nombre',true);
        }
        
      }
      this.setState({matches});
    }
    else{      
      if(!this.props.nombreValid){
        this.props.validateFields('nombre',true);
        this.setState({matches:null});
      }
      
    }
    
  }
  gotoFormerProblem=(id,nombre) =>{
    this.props.navigator.push({
      screen:'bloka.ProblemDetailScreen',
      title: nombre,
      passProps:{
        problemId: id
      }
    });
  }

  render(){
   
    return(
      this.state.matches
    );
  }
}
const styles = StyleSheet.create({
  formerProblemContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    borderColor:'black',
    borderWidth:1,
    padding:2,
    margin:2,
    
  },
});

export default graphql (getProblemsInAreaQuery) (MatchesContainer)