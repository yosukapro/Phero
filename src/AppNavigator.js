import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from 'screens/Home';
import LoginScreen from 'screens/Login';
import PairingScreen from 'screens/Pairing';
import ProfileScreen from 'screens/Profile';
import InfosAlertsScreen from 'screens/InfosAlerts';
import CapsPositionScreen from 'screens/CapsPosition';
import LogsScreen from 'screens/Logs';

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Login: LoginScreen,
    Pairing: PairingScreen,
    Profile: ProfileScreen,
    InfosAlerts: InfosAlertsScreen,
    CapsPosition: CapsPositionScreen,
    Logs: LogsScreen,
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  },
);

const App = createAppContainer(AppNavigator);

export default App;
