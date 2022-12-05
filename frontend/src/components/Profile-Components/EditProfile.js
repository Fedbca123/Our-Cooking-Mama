import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Select from "react-dropdown-select";
import { components } from "react-select";

import { buildPath } from "./../bPath";
import { useCookies } from "react-cookie";

export const EditProfile = (props) => {
	const navigate = useNavigate();
	const [nickelName, setnickName] = useState("");
	const [pronounz, setPronouns] = useState("");
	const [accountType, setaccountType] = useState("");
	const [profilePic, setProfilePic] = useState("");
	const [favCuisine, setfavCuisine] = useState("");
	const [favFlavor, setfavFlavor] = useState("");
	const [favFood, setfavFood] = useState("");
	const [favDrink, setfavDrink] = useState("");
	const [dietRest, setdietRest] = useState("");
	const [foodAllergy, setfoodAllergy] = useState("");

	var userNickName
	var userPronouns
	var userAccountType
	var userProfilePic
	var userfavCuisine
	var userfavFlavor
	var userfavDrink
	var userdietRest
	var userfoodAllerg
	var userfavFood

	//for dropdown storage
	const [selected, setSelected] = React.useState([]);

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
	}, []);

	let bp = require("./../bPath.js");

	const getData = async () => {
		const response = await fetch(bp.buildPath("api/getOneProfile"), {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
			},
			body: JSON.stringify({
				Query: cookies.id,
			}),
		}).catch((err) => {
			console.log(err);
		});
		const data = await response.json();
		if (data.error == "User profile not found.") {
			console.log("not slay!");
		} else {
			setnickName(data.NickName);
			setPronouns(data.Pronouns);
			setaccountType(data.AccountType);
			setfavCuisine(data.FavCuisine);
			setfavDrink(data.FavDrink);
			setfavFood(data.FavFood);
			setfavFlavor(data.FavoriteFlavor);
			setProfilePic(data.ProfilePhoto);
			setfoodAllergy(data.FoodAllerg);
			setdietRest(data.DietRest);
		}
	};

	// const changeProfilePic = async () => {
	// 	//et result = await ImagePicker.launchImageLibraryAsync({
	// 	//    mediaTypes: ImagePicker.MediaTypeOptions.Images,
	// 	//    allowsEditing: false,
	// 	//});
	// 	//const newProfilePic = result.assets[0].uri;
	// 	//console.log(newProfilePic);
	// 	//if (!result.canceled) {
	// 	//    setProfilePic(newProfilePic);
	// 	//}
	// };

	//Function should help bypass any data that is a circular set
	const getCircularReplacer = async () => {
		const seen = new WeakSet();
		return (key, value) => {
			if (typeof value === "object" && value !== null) {
				if (seen.has(value)) {
					return;
				}
				seen.add(value);
			}
			return value;
		};
	};

	const saveEdit = async (event) => {
		event.preventDefault();
		console.log("USer is: " + cookies.id);
		// handleStupidList();
		const formData = new FormData();
		formData.append("NickName", userNickName.value);
		formData.append("DietRest", "hello");
		formData.append("FavCuisine", "hello");
		formData.append("FavDrink", "hello");
		formData.append("FavFood", "hello");
		formData.append("FavoriteFlavor", "hello");
		formData.append("FoodAllerg", "hello");
		formData.append("userID", cookies.id);
		formData.append("pronouns", userPronouns.value);
		formData.append("AccountType", userAccountType.value);

		const response = await fetch(buildPath("api/editProfile"), {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
			},
			body: JSON.stringify({
					NickName: userNickName.value,
					DietRest: userdietRest.value,
					FavCuisine: userfavCuisine.value,
					FavDrink: userfavDrink.value,
					FavFood: userfavFood.value,
					FavoriteFlavor: userfavFlavor.value,
					FoodAllerg: userfoodAllerg.value,
					userId: cookies.id,
					AccountType: userAccountType.value,
					pronouns: userPronouns.value,

			})
		})
			.then((response) => {
				console.log(response);
			})
			.catch((err) => {
				console.log(err);
			});

		console.log("Maybe?");
		// console.log(res.nickName)

		// if (data.error == "") {
		// 	console.log("Success");
		// 	navigate("/profile");
		// } else if (data.error == "Cannot find user account.") {
		// 	console.log("User not found");
		// }
	};

	const handleStupidList = () => {
		for (let i in selected) {
			if (foodAllergy.includes(selected[i])) {
				foodAllergyArr.push(selected[i]);
			} else if (dietRest.includes(selected[i])) {
				dietRestArr.push(selected[i]);
			} else if (favFlavor.includes(selected[i])) {
				favFlavorArr.push(selected[i]);
			} else if (favFood.includes(selected[i])) {
				favFoodArr.push(selected[i]);
			} else if (favDrink.includes(selected[i])) {
				favDrinkArr.push(selected[i]);
			} else if (favCuisine.includes(selected[i])) {
				favCuisineArr.push(selected[i]);
			} else if (accountType.includes(selected[i])) {
				test(selected[i]);
			}
		}
	};

	return (
		<div className="editProf">
			<h1>Edit Profile</h1>

			<div className="drop">
				What's your name?
				<input
					type="text"
					id="nickName"
					placeholder="NickName"
					ref={(c) => (userNickName = c)}
				/>{" "}
				<br />
				What are your pronouns?
				<input
					type="text"
					id="pronouns"
					placeholder="He/Him, She/They"
					ref={(c) => (userPronouns = c)}
				/>{" "}
				<br />
				Account Type?
				<input
					type="text"
					id="acctype"
					placeholder="Personal, Business"
					ref={(c) => (userAccountType = c)}
				/>{" "}
				<br />

				<h2>Please Separate Multiple entries below with a comma</h2>
				Favorite Food?
				<input
					type="text"
					id="foodfav"
					placeholder="Pizza, Borger"
					ref={(c) => (userfavFood = c)}
				/>{" "}
				<br />
				Favorite Flavor?
				<input
					type="text"
					id="favflav"
					placeholder="Umami, Sweet, Savory"
					ref={(c) => (userfavFlavor = c)}
				/>{" "}
				<br />
				Favorite Drink?
				<input
					type="text"
					id="favdrink"
					placeholder="Water, Milk, Alcohol"
					ref={(c) => (userfavDrink = c)}
				/>{" "}
				<br />
				Favorite Cuisine?
				<input
					type="text"
					id="favcuisine"
					placeholder="Asian, Mexican, European"
					ref={(c) => (userfavCuisine = c)}
				/>{" "}
				<br />
				Amy Allergies?
				<input
					type="text"
					id="allerg"
					placeholder="Nut Allergy, etc."
					ref={(c) => (userfoodAllerg = c)}
				/>{" "}
				<br />
				Dietary Restrictions?
				<input
					type="text"
					id="acctype"
					placeholder="Gluten, Dairy"
					ref={(c) => (userdietRest = c)}
				/>{" "}
				<br />
				





				<button type="submit" onClick={saveEdit}>
					Update Profile
				</button>
				<button type="submit" onClick={() => navigate("/profile")}>
					Cancel
				</button>
			</div>
		</div>
	);
};

const favoriteFlavorOptions = [
	{
		value: 1,
		label: "Sweet",
	},
	{
		value: 2,
		label: "Salty",
	},
	{
		value: 3,
		label: "Sour",
	},
	{
		value: 4,
		label: "Savory / Umami",
	},
	{
		value: 5,
		label: "Bitter",
	},
];

const favoriteDrinkOptions = [
	{
		value: 1,
		label: "Water",
	},
	{
		value: 2,
		label: "Tea",
	},
	{
		value: 3,
		label: "Coffee",
	},
	{
		value: 4,
		label: "Coke",
	},
	{
		value: 5,
		label: "Juice",
	},
	{
		value: 6,
		label: "Milkshake",
	},
	{
		value: 7,
		label: "Soda",
	},
	{
		value: 8,
		label: "Boba tea",
	},
	{
		value: 9,
		label: "Alcohol",
	},
	{
		value: 10,
		label: "Milk",
	},
];

const FavCuisineOptions = [
	{
		value: 1,
		label: "Central African",
	},
	{
		value: 2,
		label: "East African",
	},
	{
		value: 3,
		label: "North African",
	},
	{
		value: 4,
		label: "Southern African",
	},
	{
		value: 5,
		label: "West African",
	},
	{
		value: 6,
		label: "Mexican",
	},
	{
		value: 7,
		label: "Native American",
	},
	{
		value: 8,
		label: "Canadian",
	},
	{
		value: 9,
		label: "Haitian",
	},
	{
		value: 10,
		label: "Jamaican",
	},
	{
		value: 11,
		label: "Cuban",
	},
	{
		value: 12,
		label: "American",
	},
	{
		value: 13,
		label: "Puerto Rican",
	},
	{
		value: 14,
		label: "Central Asian",
	},
	{
		value: 15,
		label: "Chinese",
	},
	{
		value: 16,
		label: "South Asian",
	},
	{
		value: 17,
		label: "Indian",
	},
	{
		value: 18,
		label: "Pakistani",
	},
	{
		value: 19,
		label: "Thai",
	},
	{
		value: 20,
		label: "Vietnamese",
	},
	{
		value: 21,
		label: "Indonesian",
	},
	{
		value: 22,
		label: "Korean",
	},
	{
		value: 23,
		label: "Japanese",
	},
	{
		value: 24,
		label: "Eastern Arabian",
	},
	{
		value: 25,
		label: "Turkish",
	},
	{
		value: 26,
		label: "Swiss",
	},
	{
		value: 27,
		label: "Austrian",
	},
	{
		value: 28,
		label: "Polish",
	},
	{
		value: 29,
		label: "Czech",
	},
	{
		value: 30,
		label: "Russian",
	},
];

const FavFoodOptions = [
	{
		value: 1,
		label: "Pizza",
	},
	{
		value: 2,
		label: "Hamburger",
	},
	{
		value: 3,
		label: "Hot Dog",
	},
	{
		value: 4,
		label: "Sushi",
	},
	{
		value: 5,
		label: "Ice cream",
	},
	{
		value: 6,
		label: "Quesadilla",
	},
	{
		value: 7,
		label: "Chicken wings",
	},
	{
		value: 8,
		label: "Mac and cheese",
	},
	{
		value: 9,
		label: "Pasta",
	},
	{
		value: 10,
		label: "Dumplings",
	},
];

const FoodAllergies = [
	{
		value: 1,
		label: "Milk",
	},
	{
		value: 2,
		label: "Eggs",
	},
	{
		value: 3,
		label: "Peanuts",
	},
	{
		value: 4,
		label: "Tree nuts",
	},
	{
		value: 5,
		label: "Sesame",
	},
	{
		value: 6,
		label: "Soy",
	},
	{
		value: 7,
		label: "Fish",
	},
	{
		value: 8,
		label: "Shellfish",
	},
	{
		value: 9,
		label: "Wheat",
	},
	{
		value: 10,
		label: "Gluten",
	},
	{
		value: 11,
		label: "Triticale",
	},
	{
		value: 12,
		label: "Celery",
	},
	{
		value: 13,
		label: "Carrot",
	},
	{
		value: 14,
		label: "Avocado",
	},
	{
		value: 15,
		label: "Bell pepper",
	},
	{
		value: 16,
		label: "Mushroom",
	},
	{
		value: 17,
		label: "Onion",
	},
	{
		value: 18,
		label: "Mustard",
	},
	{
		value: 19,
		label: "Garlic",
	},
];

const DietRest = [
	{
		value: 1,
		label: "Vegetarian",
	},
	{
		value: 2,
		label: "Vegan",
	},
	{
		value: 3,
		label: "Pescetarian",
	},
	{
		value: 4,
		label: "Dairy free",
	},
	{
		value: 5,
		label: "Gluten free",
	},
	{
		value: 6,
		label: "Paleo",
	},
	{
		value: 7,
		label: "Keto",
	},
	{
		value: 8,
		label: "Raw vegan",
	},
	{
		value: 9,
		label: "Carnivore",
	},
	{
		value: 10,
		label: "Judaism",
	},
	{
		value: 11,
		label: "Islam",
	},
	{
		value: 12,
		label: "Buddhism",
	},
	{
		value: 13,
		label: "Hinduism",
	},
];

const AccountType = [
	{
		value: 1,
		label: "Chef",
	},
	{
		value: 2,
		label: "Personal",
	},
	{
		value: 3,
		label: "Business",
	},
];

export default EditProfile;
