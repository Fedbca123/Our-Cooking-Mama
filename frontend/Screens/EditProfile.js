import * as React from 'react';
import { Image, View, StyleSheet, ImageBackground, Text, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import { PROFILE } from '../dummydata/profile'

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
    let favCuisineArr = [];
    let favFoodArr = [];
    let favDrinkArr = [];
    let favFlavorArr = [];
    let dietRestArr = [];
    let foodAllergyArr = [];


    const changeProfilePic = async () => {
        // let result = await ImagePicker.launchImageLibraryAsync({
        //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
        //     allowsEditing: false,
        // });
        // if (!result.canceled) { 
        //     console.log("Before: " + result.assets[0].uri)
        //     setImage(result.assets[0].uri);
        //     console.log("After: " + image)
        // }
        // PROFILE[0].profile_picture = result.assets[0].uri;
    }

    const parseData = () => {
        favCuisineArr = favCuisine.split(", ");
        favFoodArr = favFood.split(", ");
        favDrinkArr = favDrink.split(", ");
        favFlavorArr = favFlavor.split(", ");
        dietRestArr = dietRest.split(", ");
        foodAllergyArr = foodAllergy.split(", ");
    }

    const saveEdit = async (event) => {
        parseData();
        event.preventDefault();
        const response = await fetch('http://192.168.1.252:3000/api/editProfile', {
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
                pronouns: pronouns 
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
                <Image style={styles.logo} source={{ uri: PROFILE[0].profile_picture }} />
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
                    <TextInput style={styles.input} maxLength={10} onChangeText = {(val) => setnickName(val)}></TextInput>
                    <TextInput style={styles.input} maxLength={10} onChangeText = {(val) => setPronouns(val)}></TextInput>
                    <TextInput style={styles.input} maxLength={10} onChangeText = {(val) => setaccountType(val)}></TextInput>
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
                    <TextInput style={styles.input} onChangeText = {(val) => setfavCuisine(val)}></TextInput>
                    <TextInput style={styles.input} onChangeText = {(val) => setfavFood(val)}></TextInput>
                    <TextInput style={styles.input} onChangeText = {(val) => setfavDrink(val)}></TextInput>
                    <TextInput style={styles.input} onChangeText = {(val) => setfavFlavor(val)}></TextInput>
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
                    <TextInput style={styles.input} onChangeText = {(val) => setdietRest(val)}></TextInput>
                    <TextInput style={styles.input} onChangeText = {(val) => setfoodAllergy(val)}></TextInput>
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
    },
    element: {
        fontSize: 17
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

