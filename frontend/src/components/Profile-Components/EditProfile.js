import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { buildPath } from "./../bPath";
import { useCookies } from "react-cookie";


export const EditProfile = (props) => {
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

     // cookies :  )
     const [cookies, setCookie] = useCookies(["user"]);

     let favCuisineArr = [];
     let favFoodArr = [];
     let favDrinkArr = [];
     let favFlavorArr = [];
     let dietRestArr = [];
     let foodAllergyArr = [];

     React.useEffect(() => {
        const callAPI = () => { 
            getData();
        };
        callAPI();
     },[]);

     const getData = async () => {
        const response = await fetch(buildPath("api/getOneProfile"), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                Query: cookies.id,
            }),
        }).catch(err => {
            console.log(err);
        })
        const data = await response.json();
        if (data.error == "User profile not found.") {
            console.log("not slay!")
        } 
        else {
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
        //et result = await ImagePicker.launchImageLibraryAsync({
        //    mediaTypes: ImagePicker.MediaTypeOptions.Images,
        //    allowsEditing: false,
        //});
        //const newProfilePic = result.assets[0].uri;
        //console.log(newProfilePic);
        //if (!result.canceled) { 
        //    setProfilePic(newProfilePic);
        //}
    }

    const saveEdit = async (event) => {
        handleStupidList();
        //console.log(foodAllergyArr + '\n' + dietRestArr + '\n' + favFlavorArr + '\n' + favFoodArr + '\n' + favDrinkArr + '\n'+ favCuisineArr + '\n' + accountType);
        event.preventDefault();
        
        const response = await fetch(buildPath("api/editProfile"), {
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
                userId: cookies.id,
                AccountType: accountType,
                PersonalFeedID: cookies.id,
                pronouns: pronouns,
                ProfilePhoto: profilePic
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
                test(selected[i]);
            }
        }
    }

    return (
        <div className="editProf">
            <h1>Edit Profile</h1>

            <form onSubmit={saveEdit}>
                
            </form>
        </div>
    );
}

export default EditProfile;

const FoodAllergies = [
    'Milk',
    'Eggs',
    'Peanuts',
    'Tree nuts',
    'Sesame',
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
    'Garlic',
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
    'Korean',
    'Japanese',
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
