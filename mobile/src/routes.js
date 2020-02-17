import React from 'react';
import { createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { LinearGradient } from 'expo-linear-gradient';

import Main from './pages/Main';
import Profile from './pages/Profile';
import LocationHelp from './pages/LocationHelp';

const Routs = createAppContainer(
  createStackNavigator(
    {
      Main: {
        screen: Main,
        navigationOptions: {
          title: 'Mapa de devs'
        },
      },
      Profile: {
        screen: Profile,
        navigationOptions: {
          title: 'Perfil no Github',
        },
      },
      LocationHelp: {
        screen: LocationHelp,
        navigationOptions: {
          title: 'Localização Manual',
        },
      },
    },
    {
      defaultNavigationOptions: { 
        headerTintColor: '#fff',
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: '#12B6E0',
        },
        headerBackground: () => (
          <LinearGradient
            colors={['#12B6E0', '#12B6E0', '#12B6E0']}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        ),
        headerTitleAlign: 'center',
      },
  }
  )
);

export default Routs;