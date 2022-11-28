import * as React from 'react';
import { Image, View, StyleSheet, ImageBackground, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MultipleSelectList } from 'react-native-dropdown-select-list'
import Toast from 'react-native-toast-message';
// import { testID } from 'deprecated-react-native-prop-types/DeprecatedTextPropTypes';

export default function EditProfile( {navigation} ) {
    const background = '../Images/OCMgradientGH.png';
    const Divider = () => <View style={styles.divider}/>
    const [nickName, setnickName] = useState("");
	const [pronouns, setPronouns] = useState("");
    const [accountType, setaccountType] = useState("");
    const [profilePic, setProfilePic] = useState('');
    const [favCuisine, setfavCuisine] = useState("");
	const [favFlavor, setfavFlavor] = useState("");
    const [favFood, setfavFood] = useState("");
    const [favDrink, setfavDrink] = useState('');
    const [dietRest, setdietRest] = useState('');
    const [ foodAllergy, setfoodAllergy] = useState('');

    //for dropdown storage
    const [selected, setSelected] = React.useState([])


    let favCuisineArr = [];
    let favFoodArr = [];
    let favDrinkArr = [];
    let favFlavorArr = [];
    let dietRestArr = [];
    let foodAllergyArr = [];
    let accountTypeArr = [];


    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          getData();
        });
    
        return unsubscribe;
      }, [navigation]);

    const getData = async () => {
        const response = await fetch(global.link + '/api/getOneProfile', {
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
            console.log("User profile not found.")
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
        const newProfilePic = result.uri;
        if (!result.canceled) { 
            setProfilePic(newProfilePic);
        }
    }

    const saveEdit = async (event) => {
        handleStupidList();
        let formdata = new FormData();
        formdata.append("NickName", nickName)
        formdata.append("DietRest", dietRestArr)
        formdata.append("FavCuisine", favCuisineArr)
        formdata.append("FavDrink", favDrinkArr)
        formdata.append("FavFood", favFoodArr)
        formdata.append("FavoriteFlavor", favFlavorArr)
        formdata.append("FoodAllerg", foodAllergyArr)
        formdata.append("userId", global._id)
        formdata.append("AccountType", accountTypeArr)
        formdata.append("pronouns", pronouns)
        formdata.append("file", { uri: profilePic, name: 'image.jpg', type: 'image/jpg' })
        event.preventDefault();
        const response = await fetch(global.link + '/api/editProfile', {
			method: 'POST',
			// headers: {
			// 	'Content-Type': 'application/json',
			// 	'Accept': 'application/json',
			// },
            body: formdata
			// body: JSON.stringify({
            //     NickName: nickName,
            //     DietRest: dietRestArr,
            //     FavCuisine: favCuisineArr,
            //     FavDrink: favDrinkArr,
            //     FavFood: favFoodArr,
            //     FavoriteFlavor: favFlavorArr,
            //     FoodAllerg: foodAllergyArr,
            //     userId: global._id,
            //     AccountType: accountType,
            //     PersonalFeedID: global._id,
            //     pronouns: pronouns,
            //     ProfilePhoto: profilePic
			// }),
		}).catch(err => {
			console.log(err);
		})

        const data = await response.json()

        if (data.error == ''){
            console.log("Succes")
            Toast.show({
                type: 'success',
                text1: 'Changes saved'
            })
        } else if(data.error == "Cannot find user account."){
            console.log("User not found")
        }

    }

    const handleStupidList = () => {
        for( let i in selected){
            if(FoodAllergies.includes(selected[i])){
                foodAllergyArr.push(selected[i]);
            }
            else if(DietRest.includes(selected[i])){
                dietRestArr.push(selected[i]);
            }
            else if(FavFlavor.includes(selected[i])){
                favFlavorArr.push(selected[i]);
            }
            else if(FavFood.includes(selected[i])){
                favFoodArr.push(selected[i]);
            }
            else if(FavDrink.includes(selected[i])){
                favDrinkArr.push(selected[i]);
            }
            else if(FavCuisine.includes(selected[i])){
                favCuisineArr.push(selected[i]);
            }
            else if(AccountType.includes(selected[i])){
                accountTypeArr.push(selected[i]);
            }
        }
    }

    const test = (str) => {
        setaccountType(str);
    }

  return (
    <ScrollView>
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
                    </View>
                    <View style={{flexDirection: 'column', justifyContent: 'space-evenly'}}>
                        <TextInput style={styles.input} maxLength={20} onChangeText = {(val) => setnickName(val)}>{nickName}</TextInput>
                        <TextInput style={styles.input} maxLength={20} onChangeText = {(val) => setPronouns(val)}>{pronouns}</TextInput>
                    </View>
                </View>

                <Divider/>

                <View style={{paddingHorizontal: 10}}>
                    <MultipleSelectList 
                        setSelected={(val) => setSelected(val)} 
                        data={AccountType} 
                        save="value"
                        label="Account Type"
                        placeholder='Account Type'
                        badgeStyles={{backgroundColor: '#E39E6D'}}
                    />
                </View>

                <View style={{paddingHorizontal: 10}}>
                    <MultipleSelectList 
                        setSelected={(val) => setSelected(val)} 
                        data={FoodAllergies} 
                        save="value"
                        label="Food Allergies"
                        placeholder='Food Allergies'
                        badgeStyles={{backgroundColor: '#E39E6D'}}
                    />
                </View>

                <View style={{paddingHorizontal: 10}}>
                    <MultipleSelectList 
                        setSelected={(val) => setSelected(val)} 
                        data={DietRest} 
                        save="value"
                        label="Diet Restricitons"
                        placeholder='Diet Restricitons'
                        badgeStyles={{backgroundColor: '#E39E6D'}}
                    />
                </View>

                <View style={{paddingHorizontal: 10}}>
                    <MultipleSelectList 
                        setSelected={(val) => setSelected(val)} 
                        data={FavFlavor} 
                        save="value"
                        label="Favorite Flavor"
                        placeholder='Favorite Flavor'
                        badgeStyles={{backgroundColor: '#E39E6D'}}
                    />
                </View>

                <View style={{paddingHorizontal: 10}}>
                    <MultipleSelectList 
                        setSelected={(val) => setSelected(val)} 
                        data={FavFood} 
                        save="value"
                        label="Favorite Food"
                        placeholder='Favorite Food'
                        badgeStyles={{backgroundColor: '#E39E6D'}}
                    />
                </View>

                <View style={{paddingHorizontal: 10}}>
                    <MultipleSelectList 
                        setSelected={(val) => setSelected(val)} 
                        data={FavDrink} 
                        save="value"
                        label="Favorite Drink"
                        placeholder='Favorite Drink'
                        badgeStyles={{backgroundColor: '#E39E6D'}}
                    />
                </View>

                <View style={{paddingHorizontal: 10}}>
                    <MultipleSelectList 
                        setSelected={(val) => setSelected(val)} 
                        data={FavCuisine} 
                        save="value"
                        label="Favorite Cuisine"
                        placeholder='Favorite Cuisine'
                        badgeStyles={{backgroundColor: '#E39E6D'}}
                    />
                </View>

            </SafeAreaView>
        </ImageBackground>
    </ScrollView>
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
    height: '150%'
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

const FoodAllergies = [
    'Milk',
    'Eggs',
    'Peanuts',
    'Tree nuts',
    'Seaseme',
    'Soy',
    'Fish',
    'Shellfish',
    'Wheat',
    'Gluten',
    'Triticale',
    'Celery',
    'Carrot',
    'Avocado',
    'Bell pepper',
    'Mushroom',
    'Onion',
    'Mustard',
]

const DietRest = [
    'Vegetarian',
    'Vegan',
    'Pescetarian',
    'Dairy free',
    'Gluten free',
    'Paleo',
    'Keto',
    'Raw vegan',
    'Carnivore',
    'Judaism',
    'Islam',
    'Buddhism',
    'Hinduism',
]

const FavFlavor = [
    'Sweet',
    'Salty',
    'Sour',
    'Bitter',
    'Umami',
]

const FavCuisine = [
    'Central African',
    'East African',
    'North African',
    'Southern African',
    'West African',
    'Mexican',
    'Native American',
    'Canadian',
    'Haitian',
    'Jamaican',
    'Cuban',
    'American',
    'Puerto Rican',
    'Central Asian',
    'Chinese',
    'South Asian',
    'Indian',
    'Pakistani',
    'Thai',
    'Vietnamese',
    'Indonesian',
    'Eastern Arabian',
    'Turkish',
    'Swiss',
    'Austrian',
    'Polish',
    'Czech',
    'Russian',
    'Italian',
    'Portuguese',
    'Spanish',
    'Greek',
    'Polynesian',
]

const FavFood = [
    'Pizza',
    'Hamburger',
    'Hot Dog',
    'Sushi',
    'Burrito',
    'Ice cream',
    'Nachos',
    'Chili',
    'Quesadilla',
    'Chicken wings',
    'Tacos',
    'Mac and cheese',
    'Pasta',
    'Dumplings',
]

const FavDrink = [
    'Water',
    'Tea',
    'Coffee',
    'Coke',
    'Juice',
    'Milkshake',
    'Soda',
    'Boba tea',
    'Jose Cuervo',
    'Milk',
]

const AccountType = [
    "Chef",
    "Personal",
    "Business",
]
