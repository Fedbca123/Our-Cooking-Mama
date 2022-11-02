import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';

import LoginScreen from './Screens/LoginScreen.js';
import SignUpScreen from './Screens/SignUp.js';

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
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;
