import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import LoginScreen from './Screens/LoginScreen.js';
import SignUpScreen from './Screens/SignUp.js';
import Home from './Screens/Home.js';
import Camera from './Screens/Camera';
import Profile from './Screens/Profile';
import EditProfile from './Screens/EditProfile';
import CreatePost from './Screens/CreatePost';
import EditPost from "./Screens/EditPost.js";
import SearchResults from "./Screens/SearchResults.js";

import { LogBox } from 'react-native';

const Stack = createStackNavigator();

// Change me
global.ipv4 = '10.0.0.116';

const theme = {
	...DefaultTheme,
	color:{
		...DefaultTheme.colors,
		background: "transparent"
	}
}

const App = () => {
	// LogBox.ignoreAllLogs();
	global._id = 0;
	global.signedUser = '';
	return(
		<NavigationContainer theme={theme}>
			<Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Login">
				<Stack.Screen name="LoginScreen" component={LoginScreen} />
				<Stack.Screen name="SignUpScreen" component={SignUpScreen} />
				<Stack.Screen name="Home" component={Home} />
				<Stack.Screen name="Camera" component={Camera} />
				<Stack.Screen name="Profile" component={Profile} />
				<Stack.Screen name="EditProfile" component={EditProfile} />
				<Stack.Screen name="CreatePost" component={CreatePost} />
				<Stack.Screen name="EditPost" component={EditPost} />
				<Stack.Screen name="SearchResults" component={SearchResults} />
			</Stack.Navigator>
			<Toast />
		</NavigationContainer>
	);
}

export default App;
