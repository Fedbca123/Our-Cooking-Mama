import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import LoginScreen from './Screens/LoginScreen.js';
import SignUpScreen from './Screens/SignUp.js';
import Home from './Screens/Home.js';
import Camera from './Screens/Camera';
import Profile from './Screens/Profile';

const Stack = createStackNavigator();

const theme = {
	...DefaultTheme,
	color:{
		...DefaultTheme.colors,
		background: "transparent"
	}
}

const App = () => {
	return(
		<NavigationContainer theme={theme}>
			<Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Login">
				<Stack.Screen name="LoginScreen" component={LoginScreen} />
				<Stack.Screen name="SignUpScreen" component={SignUpScreen} />
				<Stack.Screen name="Home" component={Home} />
				<Stack.Screen name="Camera" component={Camera} />
				<Stack.Screen name="Profile" component={Profile} />
			</Stack.Navigator>
			<Toast />
		</NavigationContainer>
	);
}

export default App;