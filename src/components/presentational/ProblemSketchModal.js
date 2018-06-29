import React, {Component} from 'react';
import {View, StyleSheet,Text,ImageBackground,Alert, TouchableOpacity} from 'react-native';
import RNSketchCanvas  from '@terrylinla/react-native-sketch-canvas';
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';

import {Navigation} from 'react-native-navigation';

class ProblmeSketch extends Component {
  constructor(props) {
    super(props)

    this.state = {
      color: '#FF0000',
      thickness: 3,
    }
  }

  saveAndClose= () =>{
    this.canvas.getBase64('png', true, (err, result) => {
      if (err){ console.log (err)}
      console.log(result)
      this.props.imageSketched(result)
    })
    Navigation.dismissModal({
      animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
    });
  }
  render(){
    
    let backgroundImage = this.props.imagePicked.base64; 
    return(
      <View style={styles.container}>

          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity style={styles.functionButton} onPress={() => {
                  this.saveAndClose()
                }}>
                  <Text style={{color: 'white'}}>Listo!</Text>
                </TouchableOpacity>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity style={styles.functionButton} onPress={() => {
                    this.setState({ thickness: 10 })
                  }}>
                    <Text style={{color: 'white'}}>Thick</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.functionButton} onPress={() => {
                    this.setState({ thickness: 3 })
                  }}>
                    <Text style={{color: 'white'}}>Thin</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <ImageBackground source={{ uri: `data:image/jpeg;base64,${backgroundImage}` }}
                resizeMode= 'cover'
                style={styles.backgroundImage}>
                <SketchCanvas
                  ref={ref => this.canvas=ref}
                  style={{ backgroundColor: 'transparent', width:'100%', height:'100%',borderWidth:1, }}
                  strokeColor={this.state.color}
                  strokeWidth={this.state.thickness}  
                />
              </ImageBackground>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity style={[styles.functionButton, {backgroundColor: 'red'}]} onPress={() => {
                    this.setState({ color: '#FF0000' })
                  }}>
                    <Text style={{color: 'white'}}>Red</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.functionButton, {backgroundColor: 'black'}]} onPress={() => {
                    this.setState({ color: '#000000' })
                  }}>
                    <Text style={{color: 'white'}}>Black</Text>
                  </TouchableOpacity>
                </View>
                <Text style={{marginRight: 8, fontSize: 20}}>{ this.state.message }</Text>
                <TouchableOpacity style={[styles.functionButton, {backgroundColor: 'black', width: 90}]} onPress={() => {
                  console.log(this.canvas.getPaths())
                  Alert.alert(JSON.stringify(this.canvas.getPaths()))
                  this.canvas.getBase64('jpg', false, (err, result) => {
                    console.log(result)
                  })
                }}>
                  <Text style={{color: 'white'}}>Get Paths</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
              
          
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF',
   
  },
  backgroundImage:{
    width:'100%', height:'80%' //, flex:1
  },
  strokeColorButton: {
    marginHorizontal: 2.5, marginVertical: 8, width: 30, height: 30, borderRadius: 15,
  },
  strokeWidthButton: {
    marginHorizontal: 2.5, marginVertical: 8, width: 30, height: 30, borderRadius: 15,
    justifyContent: 'center', alignItems: 'center', backgroundColor: '#39579A'
  },
  functionButton: {
    marginHorizontal: 2.5, marginVertical: 8, height: 30, width: 60,
    backgroundColor: '#39579A', justifyContent: 'center', alignItems: 'center', borderRadius: 5,
  }
});

export default ProblmeSketch;


// <View style={{ flex: 1, flexDirection: 'row' }}>
//           {/*
//           closeComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Close</Text></View>}
//           onClosePressed={() => {
//             Navigation.dismissModal({
//               animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
//             });
//           }}
//           clearComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Clear</Text></View>}
//           eraseComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Eraser</Text></View>}
//           saveComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Save</Text></View>}
//               savePreference={() => {
//                 return {
//                   folder: 'RNSketchCanvas',
//                   filename: String(Math.ceil(Math.random() * 100000000)),
//                   transparent: true,
//                   imageType: 'png'
//                 }
//               }}
//               onSketchSaved={success => {
//                 if(success){
//                   Alert.alert('Image saved!')
//                   this.canvas.getBase64('png', true, (err, result) => {
//                     if (err){ console.log (err)}
//                     console.log(result)
//                     this.props.imageSketched(result)
//                   })
//                 }else{
//                   Alert.alert('algo ha ido mal, la imagen no se ha salvado')
//                 }
//               }}
//           */
//           }
//             <RNSketchCanvas
//               ref={ref => this.canvas=ref}
//               containerStyle={{ backgroundColor: 'transparent', flex: 1,  justifyContent: 'center', alignItems: 'center' }}
//               canvasStyle={{ backgroundColor: 'transparent', width:200, height:200,borderWidth:1, }}
//               defaultStrokeIndex={0}
//               defaultStrokeWidth={5}
//               undoComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Undo</Text></View>}
//               strokeComponent={color => (
//                 <View style={[{ backgroundColor: color }, styles.strokeColorButton]} />
//               )}
//               strokeSelectedComponent={(color, index, changed) => {
//                 return (
//                   <View style={[{ backgroundColor: color, borderWidth: 2 }, styles.strokeColorButton]} />
//                 )
//               }}
//               strokeWidthComponent={(w) => {
//                 return (<View style={styles.strokeWidthButton}>
//                   <View  style={{
//                     backgroundColor: 'white', marginHorizontal: 2.5,
//                     width: Math.sqrt(w / 3) * 10, height: Math.sqrt(w / 3) * 10, borderRadius: Math.sqrt(w / 3) * 10 / 2
//                   }} />
//                 </View>
//               )}}
//               closeComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Close</Text></View>}
//               onClosePressed={() => this.saveAndClose()}
              
//             />
//           </View>