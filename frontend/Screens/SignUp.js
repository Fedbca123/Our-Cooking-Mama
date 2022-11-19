import React from 'react';
import { Text, View, StyleSheet, Button, ImageBackground, TextInput } from 'react-native'
import { useState } from 'react';
import Toast from 'react-native-toast-message';

const background = '../Images/OCMgradient.png'
// const logo = '../Images/OCMlogo2.png';


const SignUpScreen = ({ navigation }) => {
	const [UN, setUN] = useState("");
	const [PW, setPW] = useState("");
	const [PW2, setPW2] = useState("");
	const [FN, setFN] = useState("");
	const [LN, setLN] = useState("");
	const [EM, setEM] = useState("");
	const comparePass = PW.localeCompare(PW2);

	const handleCreate = async (e) => {
		if (UN == '' || PW == '' || PW2 == '' || FN == '' || LN == '' || EM == '') {
			Toast.show({
				type: 'error',
				text1: 'All fields are required'
			})
		} else {
			if (PW === PW2) {
				e.preventDefault();
				try {
					// IP address is unique, expo/express can't resolve 'localhost' so you need to ipconfig in cmd and replace with the ipv4
					// This should be no issue once deployed on heroku
					const response = await fetch('http://192.168.1.252:3000/api/register', {
						method: 'post',
						headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							FirstName: FN,
							LastName: LN,
							UserName: UN,
							Email: EM,
							Password: PW
						})
					});
					const data = await response.json();
					if (data._id != null) {
						Toast.show({
							type: 'success',
							text1: 'You have successfully signed up!'
						})
						navigation.navigate('LoginScreen');
					} else {
						Toast.show({
							type: 'error',
							text1: 'Username is already taken'
						})
					}
				} catch (e) {
					console.log(e);
				}
			} else {
				Toast.show({
					type: 'error',
					text1: 'Passwords do not match'
				})
			}
		}

	}

	const switchL = () => {
		navigation.navigate('LoginScreen');
	}

	return (
		<ImageBackground style={styles.background} source={require(background)}>
			<View style={{ alignItems: 'center' }}>
				<Text style={styles.title}>Sign Up</Text>
				<Text>Become a chef today!</Text>
			</View>

			<View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
				<Text style={styles.switchButton} onPress={switchL}>Login</Text>
				<Text> </Text>
				<Text style={styles.switchButtonColored}>Sign Up</Text>
			</View>

			<View>
				<TextInput
					placeholder="Username"
					style={styles.input}
					autoCorrect={false}
					onChangeText={(val) => setUN(val)}
					backgroundColor='#fff'
				/>
				<TextInput
					placeholder="First name"
					style={styles.input}
					autoCorrect={false}
					onChangeText={(val) => setFN(val)}
					backgroundColor='#fff'
				/>
				<TextInput
					placeholder="Last name"
					style={styles.input}
					autoCorrect={false}
					onChangeText={(val) => setLN(val)}
					backgroundColor='#fff'
				/>
				<TextInput
					placeholder="Email"
					style={styles.input}
					autoCorrect={false}
					onChangeText={(val) => setEM(val)}
					backgroundColor='#fff'
				/>
				<TextInput
					placeholder="Password"
					style={styles.input}
					autoCorrect={false}
					secureTextEntry={true}
					onChangeText={(val) => setPW(val)}
					backgroundColor='#fff'
				/>
				<TextInput
					placeholder=" Confirm Password"
					style={styles.input}
					autoCorrect={false}
					secureTextEntry={true}
					onChangeText={(val) => setPW2(val)}
					backgroundColor='#fff'
				/>
			</View>

			<View>
				<Text style={styles.button} onPress={handleCreate}>Create Account</Text>
			</View>

		</ImageBackground>
	);
}


export default SignUpScreen

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
		width: 200,
		borderRadius: 20,
	},
	logo: {
		width: 150,
		height: 150,
		resizeMode: 'center',
		marginLeft: 65,
	},
	button: {
		borderWidth: 2,
		padding: 5,
		width: 145,
		textAlign: 'center',
		backgroundColor: '#E39E6D',
		borderRadius: 15,
		overflow: 'hidden',
		marginTop: 10,
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
