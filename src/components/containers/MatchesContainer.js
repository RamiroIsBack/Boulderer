import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {Navigation} from 'react-native-navigation';
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native';
import getProblemsInAreaQuery from '../../queries/GetProblemsInArea';
import {filterList} from '../../utility/validation'

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
      let matches=[]
      let listFiltered= filterList(this.props.data.area.problems,inputName);
      if(listFiltered.length > 0){
        if(this.props.nombreValid){
          this.props.validateFields('nombre',false);
        } 
        matches= listFiltered.map(problem =>
          <View style= {styles.formerProblemContainer}
          key= {problem.id}
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
         matches.push(<Text key= 'not repeating key :P'>no repitas bloques :) mira a ver si alguno de estos te vale</Text>)
        
        this.setState({matches});
      }else{
        if(!this.props.nombreValid){
          this.props.validateFields('nombre',true);
        }
        this.setState({matches:null});
      }
    }
    else{    
      if(!this.props.nombreValid){
        this.props.validateFields('nombre',true);
        this.setState({matches:null});
      }
      if(this.state.matches !==null){
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
      <View>
      {this.state.matches}
      </View>
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