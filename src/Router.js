import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from './pages/LoginScreen';
import SeriesPage from './pages/SeriesPage';
import SerieDetailPage from './pages/SerieDetailPage';
import SerieFormPage from './pages/SerieFormPage';

const AppNavigator = createStackNavigator({
  'Main': {
    screen: SeriesPage,
  },
  'Login': {
    screen: LoginScreen,
    navigationOptions: {
      title: "Bem vindo!",
    }
  },
  'SerieDetail': {
    screen: SerieDetailPage,
    navigationOptions: ({ navigation }) => {
      const { serie } = navigation.state.params;
      return {
          title: serie.title,
      }
    }
  },
  'SerieForm': {
    screen: SerieFormPage,
    navigationOptions: {
      title: "New Serie",
    }
  },
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
