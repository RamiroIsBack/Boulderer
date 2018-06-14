import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons' 
import {Platform} from 'react-native';

export const startMainTabs = () =>{
  Promise.all([
    Icon.getImageSource(Platform.OS ==='android'?'md-map':'ios-map'
      ,30,'blue'),
    
    Icon.getImageSource(Platform.OS === 'android'?'md-add-circle':'ios-add-circle',30,'blue'),
    Icon.getImageSource(Platform.OS ==='android'?'md-menu':'ios-menu',30,'blue'),
    Icon.getImageSource(Platform.OS === 'android'?'md-search':'ios-search',30,'blue'), 
    Icon.getImageSource(Platform.OS === 'android'?'md-person':'ios-person',30,'blue'),

  ]).then(sources =>{
    Navigation.startTabBasedApp({
      tabs:[
        
        {
          screen: 'bloka.MapaScreen',
          title: 'Mapa',
          icon: sources[0],
          navigatorButtons:{
            leftButtons:[
              {
                icon: sources[2],
                title: 'menu',
                id:'sideDrowerToggle'
              }
            ]
          }
        },
        
        {
          screen: 'bloka.BuscarScreen',
          title: 'Buscar',
          icon: sources[3],
          navigatorButtons:{
            leftButtons:[
              {
                icon: sources[2],
                title: 'menu',
                id:'sideDrowerToggle'
              }
            ]
          }
        },
        {
          screen: 'bloka.CompartirScreen',
          title: 'Compartir',
          icon: sources[1],
          navigatorButtons:{
            leftButtons:[
              {
                icon: sources[2],
                title: 'menu',
                id:'sideDrowerToggle'
              }
            ]
          }
        },
        {
          screen: 'bloka.PersonalScreen',
          title: 'Personal',
          icon: sources[4],
          navigatorButtons:{
            leftButtons:[
              {
                icon: sources[2],
                title: 'menu',
                id:'sideDrowerToggle'
              }
            ]
          }
        },
      ],
      tabsStyle:{
        tabBarSelectedButtonColor: 'blue'
      },
      drawer:{
        left:{
          screen: 'bloka.SideDrower',
          title: 'sideDrower',
          icon: sources[2]
        }
      },
      appStyle:{
        tabBarSelectedButtonColor: 'blue'
      },
    });
  });
}

export const startAuth = ()=>{
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'bloka.AuthScreen',
      title: 'Bienvenid@ :)'
    }
  });
};