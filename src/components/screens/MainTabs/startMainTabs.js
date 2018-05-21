import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons' 
import {Platform} from 'react-native';

const startMainTabs = () =>{
  Promise.all([
    Icon.getImageSource(Platform.OS ==='android'?'md-map':'ios-map'
      ,30,'blue'),
    Icon.getImageSource(Platform.OS ==='android'?'md-share-alt':'ios-share',30),
    Icon.getImageSource(Platform.OS ==='android'?'md-menu':'ios-menu',30),
  ]).then(sources =>{
    Navigation.startTabBasedApp({
      tabs:[
        {
          screen: 'bloka.SharePlaceScreen',
          label: 'Share place',
          title: 'Share Place',
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
          screen: 'bloka.FindPlaceScreen',
          label: 'Find place',
          title: 'Find Place',
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

export default startMainTabs;