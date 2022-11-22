import { Text, View, StyleSheet, Button, ImageBackground, TextInput, Image, TouchableOpacity } from 'react-native'
import { useState } from 'react';
import React from 'react';
import Toast from 'react-native-toast-message';

const background = '../Images/OCMgradient.png'
const logo = '../Images/OCMlogo2.png';


const LoginScreen = ({ navigation }) => {
	const [UN, setUN] = useState("");
	const [PW, setPW] = useState("");

	async function handleLogin(event) {
		// navigation.navigate('Home');
		event.preventDefault()
		// IP address is unique, expo/express can't resolve 'localhost' so you need to ipconfig in cmd and replace with the ipv4
		// This should be no issue once deployed on heroku

		const response = await fetch('http://' + global.ipv4 + ':3000/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			},
			body: JSON.stringify({
				UserName: UN,
				Password: PW
			}),
		}).catch(err => {
			console.log(err);
		})
		const data = await response.json()
		if (data.error == '') {
			navigation.navigate('Home');
		} else if (data.error == 'Passwords do not match.') {
			Toast.show({
				type: 'error',
				text1: 'Username / Password combination is incorrect'
			})
		} else {
			Toast.show({
				type: 'error',
				text1: 'Username / Password combination is incorrect'
			})
		}

		global._id = data._id;
		global.signedUser = data.FirstName;
	}

	const switchS = () => { //handles screen switching
		navigation.navigate('SignUpScreen');
	}

	return (
		<ImageBackground style={styles.background} source={require(background)}>
			<View>
				<Text style={styles.title}>Our Cooking Mama</Text>
				<Image source={require(logo)} style={styles.logo}></Image>

				<View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10 }}>
					<Text style={styles.switchButtonColored}>Login</Text>
					<Text> </Text>
					<Text style={styles.switchButton} onPress={switchS}>Sign Up</Text>
				</View>

				<TextInput
					placeholder="Username"
					style={styles.input}
					onChangeText={(val) => setUN(val)}
					backgroundColor='#fff'
				/>
				<TextInput
					placeholder="Password"
					style={styles.input}
					secureTextEntry={true}
					onChangeText={(val) => setPW(val)}
					backgroundColor='#fff'
				/>
			</View>

			<View>
				<Text style={styles.button} onPress={handleLogin}>Login</Text>
			</View>

		</ImageBackground>
	);
}

export default LoginScreen

const styles = StyleSheet.create({
	title: {
		fontSize: 35,
		alignItems: 'center',
		marginTop: 100,
	},
	background: {
		flex: 1,
		alignItems: 'center',
	},
	container: {
		flex: 1,
	},
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
		borderRadius: 20,
	},
	logo: {
		width: 150,
		height: 150,
		resizeMode: 'center',
		alignSelf: 'center'
	},
	button: {
		borderWidth: 2,
		padding: 5,
		width: 100,
		textAlign: 'center',
		backgroundColor: '#E39E6D',
		borderRadius: 15,
		overflow: 'hidden',
	},
	switchButton: {
		padding: 7,
		width: 100,
		textAlign: 'center',
		backgroundColor: 'grey',
		borderRadius: 15,
		overflow: 'hidden',
	},
	switchButtonColored: {
		padding: 7,
		width: 100,
		textAlign: 'center',
		backgroundColor: '#E39E6D',
		borderRadius: 15,
		overflow: 'hidden',
	},

});
