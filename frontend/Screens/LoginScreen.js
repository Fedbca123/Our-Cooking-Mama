import { Text, View, StyleSheet, Button, ImageBackground, TextInput, Image, TouchableOpacity } from 'react-native'
import { useState } from 'react';
import React from 'react';

const background = '../Images/OCMgradient.jpg'
const logo = '../Images/OCMlogo2.png';


const LoginScreen = ( {navigation} ) => {
	const [UN, setUN] = useState("");
	const [PW, setPW] = useState("");

	// const handleLogin = async() => {
	// 	e.preventDefault();
	// 	try {
	// 		await fetch('http://172.25.208.1:3000/api/login', {
	// 			method: 'post',
	// 			headers: {
	// 				'Accept': 'application/json',
	// 				'Content-Type':'application/json'
	// 			},
	// 			body: JSON.stringify({
	// 				UserName: UN,
	// 				Password: PW
	// 			})
	// 		});
	// 	} catch (e) {
	// 		console.log(e);
	// 	}
	// }

	
	async function handleLogin(event) {
		event.preventDefault()

		const response = await fetch('http://172.25.208.1:3000/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				UserName: UN,
				Password: PW
			}),
		})

		const data = await response.json()

		if (data.user) {
			console.log(data.error)
		} else {
			console.log(data.error)
		}
	}

	const switchS = () => { //handles screen switching
		navigation.navigate('SignUpScreen');
	}

	return(
		<ImageBackground style={styles.background}source={require(background)}>
			<View>
				<Text style = {styles.title}>Our Cooking Mama</Text>
				<Image source={require(logo)} style = {styles.logo}></Image>
				<TextInput
					placeholder= "Username"
					style = {styles.input}
					onChangeText = {(val) => setUN(val)}
					backgroundColor = '#fff'
				/>
				<TextInput
					placeholder= "Passowrd"
					style = {styles.input}
					onChangeText = {(val) => setPW(val)}
					backgroundColor = '#fff'
				/>
			</View>

			<View>
				<Text style={styles.button} onPress={handleLogin}>Login</Text>
			</View>

			<View style ={{flexDirection: 'row', marginTop: 200}}>
				<Text style={styles.switchButtonColored}>Login</Text> 
				<Text> </Text>
				<Text style = {styles.switchButton} onPress={switchS}>Sign Up</Text>
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
	container:{
		flex: 1,
	},
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
		borderRadius: 20,
	},
	logo:{
		width: 150,
		height: 150,
		resizeMode: 'center',
		marginLeft: 65,
	},
	button:{
		borderWidth: 2,
		padding: 5,
		width: 100,
		textAlign: 'center',
		backgroundColor: '#E39E6D',
        borderRadius: 15,
        overflow: 'hidden',
	},
	switchButton:{
		padding: 7,
		width: 100,
		textAlign: 'center',
		backgroundColor: 'grey',
        borderRadius: 15,
        overflow: 'hidden',
		marginTop: 70,
	},
	switchButtonColored:{
		padding: 7,
		width: 100,
		textAlign: 'center',
		backgroundColor: '#E39E6D',
        borderRadius: 15,
        overflow: 'hidden',
		marginTop: 70,
	},
	
  });