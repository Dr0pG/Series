import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from './pages/LoginScreen';
import SeriesPage from './pages/SeriesPage';

const AppNavigator = createStackNavigator({
  'Login': {
    screen: LoginScreen,
    navigationOptions: {
      title: "Bem vindo!",
    }
  },
  'Main': {
    screen: SeriesPage,
  }
}, {
  defaultNavigationOptions: {
    title: "Series",
    headerStyle: {
      backgroundColor: "#6ca2f7",
      borderBottomWidth: 1,
      borderBottomColor: "#C5C5C5",
    },
    headerTitleStyle: {
      color: "white",
      fontSize: 30,
    },
    headerTintColor: "white",
  }
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
