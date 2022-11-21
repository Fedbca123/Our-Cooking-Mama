import * as React from 'react';
import { Image, View, StyleSheet, ImageBackground, Text, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

export default function EditProfile( {navigation} ) {
    const background = '../Images/OCMgradient.png';
    const Divider = () => <View style={styles.divider}/>
    const [image, setImage] = useState(null);
    const [nickName, setnickName] = useState("");
	const [pronouns, setPronouns] = useState("");
    const [favCuisine, setfavCuisine] = useState("");
	const [favFood, setfavFood] = useState("");
    const [favDrink, setfavDrink] = useState("");
	const [favFlavor, setfavFlavor] = useState("");
    const [dietRest, setdietRest] = useState("");
	const [foodAllergy, setfoodAllergy] = useState("");
    const [accountType, setaccountType] = useState("");
    const [profilePic, setProfilePic] = useState('');
    let favCuisineArr = [];
    let favFoodArr = [];
    let favDrinkArr = [];
    let favFlavorArr = [];
    let dietRestArr = [];
    let foodAllergyArr = [];

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          getData();
        });
    
        return unsubscribe;
      }, [navigation]);

    const getData = async () => {
        const response = await fetch('http://' + global.ipv4 + ':3000/api/getOneProfile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                Query: global._id,
            }),
        }).catch(err => {
            console.log(err);
        })
        const data = await response.json();
        if (data.error == "User profile not found.") {
            console.log("not slay!")
        } else {
            setnickName(data.NickName)
            setPronouns(data.Pronouns)
            setaccountType(data.AccountType)
            setfavCuisine(data.FavCuisine)
            setfavDrink(data.FavDrink)
            setfavFood(data.FavFood)
            setfavFlavor(data.FavoriteFlavor)
            setProfilePic(data.ProfilePhoto)
            setfoodAllergy(data.FoodAllerg)
            setdietRest(data.DietRest)
        }
    }


    const changeProfilePic = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
        });
        const newProfilePic = result.assets[0].uri;
        if (!result.canceled) { 
            //console.log("Before: " + result.assets[0].uri)
            setImage(newProfilePic);
            //console.log("After: " + image)
        }
    }

    const parseData = () => {
        favCuisineArr = favCuisine.toString().split(", ");
        favFoodArr = favFood.toString().split(", ");
        favDrinkArr = favDrink.toString().split(", ");
        favFlavorArr = favFlavor.toString().split(", ");
        dietRestArr = dietRest.toString().split(", ");
        foodAllergyArr = foodAllergy.toString().split(", ");
    }

    const saveEdit = async (event) => {
        parseData();
        event.preventDefault();
        const response = await fetch('http://' + global.ipv4 + ':3000/api/editProfile', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			},
			body: JSON.stringify({
                NickName: nickName,
                DietRest: dietRestArr,
                FavCuisine: favCuisineArr,
                FavDrink: favDrinkArr,
                FavFood: favFoodArr,
                FavoriteFlavor: favFlavorArr,
                FoodAllerg: foodAllergyArr,
                userId: global._id,
                AccountType: accountType,
                PersonalFeedID: global._id,
                pronouns: pronouns,
                ProfilePhoto: image
			}),
		}).catch(err => {
			console.log(err);
		})

        const data = await response.json()

        if (data.error == ''){
            console.log("Succes")
        } else if(data.error == "Cannot find user account."){
            console.log("User not found")
        }

    }

  return (
    <ImageBackground source={require(background)} style={styles.background}>
        <SafeAreaView style={{flex: 1}}>
            
            <View style={styles.contianerHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={40} color="black" />
                </TouchableOpacity>

                <TouchableOpacity onPress={saveEdit}>
                    <Entypo name="save" size={28} color="black"/>
                </TouchableOpacity>
            </View>

            <View style={{}}>
                {(profilePic == '')? 
                <Text></Text>
                :
                <Image style={styles.logo} source={{ uri: profilePic }} />
                }
                <TouchableOpacity onPress={changeProfilePic}>
                    <Text style={{alignSelf: 'center', color: 'steelblue'}}>Change Profile Picture</Text>
                </TouchableOpacity>
            </View>

            <Divider/> 

            <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <View style={{flexDirection: 'column', justifyContent: 'space-evenly'}}>
                    <Text style={styles.element}>NickName</Text>
                    <Text style={styles.element}>Pronouns</Text>
                    <Text style={styles.element}>Account type</Text>
                </View>
                <View style={{flexDirection: 'column', justifyContent: 'space-evenly'}}>
                    <TextInput style={styles.input} maxLength={10} onChangeText = {(val) => setnickName(val)}>{nickName}</TextInput>
                    <TextInput style={styles.input} maxLength={10} onChangeText = {(val) => setPronouns(val)}>{pronouns}</TextInput>
                    <TextInput style={styles.input} maxLength={10} onChangeText = {(val) => setaccountType(val)}>{accountType}</TextInput>
                </View>
            </View>

            <Divider/>

            <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <View style={{flexDirection: 'column', justifyContent: 'space-evenly'}}>
                    <Text style={styles.element}>Favorite cuisine</Text>
                    <Text style={styles.element}>Favorite food</Text>
                    <Text style={styles.element}>Favorite drink</Text>
                    <Text style={styles.element}>Favorite flavor</Text>
                </View>
                <View style={{flexDirection: 'column', justifyContent: 'space-evenly'}}>
                    <TextInput style={styles.input} onChangeText = {(val) => setfavCuisine(val)}>{favCuisine}</TextInput>
                    <TextInput style={styles.input} onChangeText = {(val) => setfavFood(val)}>{favFood}</TextInput>
                    <TextInput style={styles.input} onChangeText = {(val) => setfavDrink(val)}>{favDrink}</TextInput>
                    <TextInput style={styles.input} onChangeText = {(val) => setfavFlavor(val)}>{favFlavor}</TextInput>
                </View>
            </View>

            <Text style={styles.disclaimer}>Seperate elements with a comma</Text>

            <Divider/>

            <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <View style={{flexDirection: 'column', justifyContent: 'space-evenly'}}>
                    <Text style={styles.element}>Diet restrictions</Text>
                    <Text style={styles.element}>Food allergies</Text>
                </View>
                <View style={{flexDirection: 'column', justifyContent: 'space-evenly'}}>
                    <TextInput style={styles.input} onChangeText = {(val) => setdietRest(val)}>{dietRest}</TextInput>
                    <TextInput style={styles.input} onChangeText = {(val) => setfoodAllergy(val)}>{foodAllergy}</TextInput>
                </View>
            </View>

            <Text style={styles.disclaimer}>Seperate elements with a comma</Text>

            <Divider/>

        </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#75b9be',
    alignSelf: 'center'
    },
    divider: {
        marginVertical: 8,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'black'
    },
    input: {
        backgroundColor: '#fff',
        width: 200,
        borderRadius: 20,
        borderWidth: 1,
        paddingLeft: 10,
        marginVertical: 3,
        padding: 3
    },
    element: {
        fontSize: 20
    },
    disclaimer: {
        alignSelf: 'center',
        fontSize: 12
    },
    contianerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 15,
        width: ScreenWidth,
        paddingLeft: 10,
        paddingRight: 10

    },
    logoContainer: {
        flexDirection: 'row',
    }
});
