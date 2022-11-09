import React from 'react';
import { Text, View, StyleSheet, Button, ImageBackground, TextInput, TouchableOpacity } from 'react-native'
import { useState } from 'react';
import { NavigationEvents } from 'react-navigation';

const background = '../Images/OCMgradient.jpg'
const logo = '../Images/OCMlogo2.png';

const SignUpScreen = ({ navigation }) => {
	const [UN, setUN] = useState("");
	const [PW, setPW] = useState("");
	const [PW2, setPW2] = useState("");
	const [FN, setFN] = useState("");
	const [LN, setLN] = useState("");
	const [EM, setEM] = useState("");
	const comparePass = PW.localeCompare(PW2);

	const handleCreate = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch('http://172.25.208.1:3000/api/register', {
				method: 'post',
				headers: {
					'Accept': 'application/json',
					'Content-Type':'application/json'
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
			console.log(data._id);
		} catch (e) {
			console.log(e);
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

			<View>
				<TextInput
					placeholder="Username"
					style={styles.input}
					onChangeText={(val) => setUN(val)}
					backgroundColor='#fff'
				/>
				<TextInput
					placeholder="First name"
					style={styles.input}
					onChangeText={(val) => setFN(val)}
					backgroundColor='#fff'
				/>
				<TextInput
					placeholder="Last name"
					style={styles.input}
					onChangeText={(val) => setLN(val)}
					backgroundColor='#fff'
				/>
				<TextInput
					placeholder="Email"
					style={styles.input}
					onChangeText={(val) => setEM(val)}
					backgroundColor='#fff'
				/>
				<TextInput
					placeholder="Password"
					style={styles.input}
					onChangeText={(val) => setPW(val)}
					backgroundColor='#fff'
				/>
				<TextInput
					placeholder=" Confirm Password"
					style={styles.input}
					onChangeText={(val) => setPW2(val)}
					backgroundColor='#fff'
				/>
			</View>

			<View>
				<Text style={styles.button} onPress={handleCreate}>Create Account</Text>
			</View>

			<View style={{ flexDirection: 'row', marginTop: 135 }}>
				<Text style={styles.switchButton} onPress={switchL}>Login</Text>
				<Text> </Text>
				<Text style={styles.switchButtonColored}>Sign Up</Text>
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
		marginBottom: 70,
	},
	switchButtonColored: {
		padding: 7,
		width: 100,
		textAlign: 'center',
		backgroundColor: '#E39E6D',
		borderRadius: 15,
		overflow: 'hidden',
		marginBottom: 70,
	},

});