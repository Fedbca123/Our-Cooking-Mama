import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Image, ImageBackground, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import Toast from 'react-native-toast-message';
import { Entypo } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const background = '../Images/OCMgradient.png'
// const logo = '../Images/OCMlogo2.png';


const SignUpScreen = ({ navigation }) => {
	const [UN, setUN] = useState("");
	const [PW, setPW] = useState("");
	const [PW2, setPW2] = useState("");
	const [FN, setFN] = useState("");
	const [LN, setLN] = useState("");
	const [EM, setEM] = useState("");
	const [seePass, setSeePass] = useState(true);
	const comparePass = PW.localeCompare(PW2);
	const greencheck = '../Images/greencheck.png';
	const redx = '../Images/redx.png';
	const defaultProfilePic = '../Images/chegImg.png';

	const handleCreate = async (e) => {
		if (passAllCheck(PW)) {
			console.log("Nice ._.")
		} else {
			//console.log("Password must meet all criteria")
			Toast.show({
				type: 'error',
				text1: 'Password must meet all criteria'
			})
			return;
		}

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
					const response = await fetch(global.link + '/api/register', {
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
					// setAccountStats(data)
					// console.log("ok i literally just set accountStats its " + accountStats)
					if (data._id != null) {
						Toast.show({
							type: 'success',
							text1: 'Check your e-mail to verify your account!'
						})
						initializeProfile(data);
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

	async function initializeProfile(data) {
		console.log("Grabbed  new initializedProfile ID as " + data._id)
		const response = await fetch(global.link + '/api/editProfile', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			},
			body: JSON.stringify({
				NickName: "New Chef",
				DietRest: "",
				FavCuisine: "",
				FavDrink: "",
				FavFood: "",
				FavoriteFlavor: "",
				FoodAllerg: "",
				userId: data._id,
				AccountType: "",
				// PersonalFeedID: global._id,
				pronouns: "",
				ProfilePhoto: defaultProfilePic
			}),
		}).catch(err => {
			console.log(err);
		})

		const dataret = await response.json()
		console.log("Okay here is the initialized profile's feed ID " + dataret.PersonalFeedID)
		followDummy(dataret, data)
	}

	async function followDummy(dataret, dataID) {
		console.log("Grabbed  new feed ID as " + dataret.PersonalFeedID)
		const response = await fetch(global.link + '/api/follow', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			},
			body: JSON.stringify({
				FollowerProfileID: '6382e54422ecafcaed0cadaf', // this is the dummy account
				FollowingProfileID: dataID._id //this is whoever is registering
			}),
		}).catch(err => {
			console.log(err);
		})
		const data = await response.json()
		console.log(data)
	}

	const switchL = () => {
		navigation.navigate('LoginScreen');
	}

	function hasNumber(myString) {
		return !/\d/.test(myString);
	}

	function hasSpecialChar(str) {
		return !/[~`!#$@%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str);
	}

	function hasUpper(str) {
		return !/[A-Z]/.test(str);
	}

	function passAllCheck() {
		if (!hasUpper(PW) && PW.length >= 8 && !hasNumber(PW) && !hasSpecialChar(PW) && !comparePass) {
			//console.log("Nice " + hasUpper(PW) + " " + (PW.length >= 8) + " " + hasNumber(PW) + " " + hasSpecialChar(PW) + " " + comparePass);
			return true;
		}
		return false;
	}

	const changeSeePass = () => {
		setSeePass(!seePass);
	}

	function isValidEmail(email) {
		if (EM == '') {
			return true;
		}
		return /\S+@\S+\.\S+/.test(email);
	}

	let otp = ''
	const generateOTP = () => {
		for (let i = 0; i <= 3; i++) {
			const randVal = Math.round(Math.random() * 9);
			otp = otp + randVal;
		}
		console.log(otp)
		return otp;
	}

	return (

		<ImageBackground style={styles.background} source={require(background)}>
			<KeyboardAwareScrollView>
				<View style={{ alignItems: 'center' }}>
					<Text style={styles.title}>Sign Up</Text>
					<Text>Become a chef today!</Text>
				</View>

				<View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
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

					{isValidEmail(EM) ?
						<View></View>
						:
						<Text style={styles.validEmText}>Please enter a valid email</Text>
					}

					<View style={styles.passWrapper}>
						<TextInput
							placeholder="Password"
							style={{ width: 150 }}
							autoCorrect={false}
							secureTextEntry={seePass}
							onChangeText={(val) => setPW(val)}
							backgroundColor='#fff'
						/>
						{!seePass ?
							<TouchableOpacity onPress={() => setSeePass(!seePass)}>
								<Entypo name="eye" color="black" size={20} />
							</TouchableOpacity>
							:
							<TouchableOpacity onPress={() => setSeePass(!seePass)}>
								<Entypo name="eye-with-line" color="black" size={20} />
							</TouchableOpacity>
						}
					</View>
					<View style={styles.passWrapper}>
						<TextInput
							placeholder=" Confirm Password"
							style={{ width: 150 }}
							autoCorrect={false}
							secureTextEntry={seePass}
							onChangeText={(val) => setPW2(val)}
							backgroundColor='#fff'
						/>
						{!seePass ?
							<TouchableOpacity onPress={() => setSeePass(!seePass)}>
								<Entypo name="eye" color="black" size={20} />
							</TouchableOpacity>
							:
							<TouchableOpacity onPress={() => setSeePass(!seePass)}>
								<Entypo name="eye-with-line" color="black" size={20} />
							</TouchableOpacity>
						}
					</View>
				</View>

				<View>
					<Text style={styles.button} onPress={handleCreate}>Create Account</Text>
				</View>

				{(PW == '') ?
					<Text></Text> //Place Holder
					:
					<View style={styles.passCheck}>
						<View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingLeft: 15 }}>
							{(PW.length < 8) ?
								<Image source={require(redx)} style={styles.passIcon}></Image>
								:
								<Image source={require(greencheck)} style={styles.passIcon}></Image>
							}
							<Text style={{ padding: 2, fontSize: 11.5, paddingLeft: 15 }}>Password has atleast 8 characters</Text>
						</View>
						<View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingLeft: 15 }}>
							{(hasNumber(PW)) ?
								<Image source={require(redx)} style={styles.passIcon}></Image>
								:
								<Image source={require(greencheck)} style={styles.passIcon}></Image>
							}
							<Text style={{ padding: 2, fontSize: 11.5, paddingLeft: 15 }}>Atleast one numeric character (0-9)</Text>
						</View>
						<View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingLeft: 15 }}>
							{(hasSpecialChar(PW)) ?
								<Image source={require(redx)} style={styles.passIcon}></Image>
								:
								<Image source={require(greencheck)} style={styles.passIcon}></Image>
							}
							<Text style={{ padding: 2, fontSize: 11.5, paddingLeft: 15 }}>Atleast one special character</Text>
						</View>
						<View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingLeft: 15 }}>
							{(hasUpper(PW)) ?
								<Image source={require(redx)} style={styles.passIcon}></Image>
								:
								<Image source={require(greencheck)} style={styles.passIcon}></Image>
							}
							<Text style={{ padding: 2, fontSize: 11.5, paddingLeft: 15 }}>Atleast one upper case letter</Text>
						</View>
						<View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingLeft: 15 }}>
							{(comparePass) ?
								<Image source={require(redx)} style={styles.passIcon}></Image>
								:
								<Image source={require(greencheck)} style={styles.passIcon}></Image>
							}
							<Text style={{ padding: 2, fontSize: 11.5, paddingLeft: 15 }}>Passwords match</Text>
						</View>
					</View>

				}
			</KeyboardAwareScrollView>
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
		alignSelf: 'center',
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
	passCheck: {
		width: '70%',
		height: '15%',
		borderWidth: 1,
		marginTop: 10,
		borderRadius: 10,
		flexDirection: 'column',
		justifyContent: 'space-evenly',
	},
	passIcon: {
		width: 15,
		height: 15,
	},
	passWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
		width: 200,
		borderRadius: 20,
		backgroundColor: '#fff',
		justifyContent: 'space-between'
	},
	validEmText: {
		color: 'red',
		fontSize: 12,
		justifyContent: 'center',
		alignSelf: 'center'
	}
});
