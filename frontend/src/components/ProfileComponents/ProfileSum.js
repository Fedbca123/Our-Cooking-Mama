import React, { useState } from "react";

import { buildPath } from "./../bPath";

import Chef from "./../Images/chef.png";

export const ProfileSum = (props) => {

    //const [modalVisible, setModalVisible] = useState(false);
    const [nickName, setNickName] = useState('');
    const [pronouns, setPronouns] = useState('');
    const [accountType, setAccountType] = useState('');
    const [favCuisine, setCuisine] = useState('');
    const [favDrink, setDrink] = useState('');
    const [favFood, setFood] = useState('');
    const [favFlavor, setFlavor] = useState('');
    const [profilePic, setProfilePic] = useState('');

    let favCuisineArr = [];
    let favFoodArr = [];
    let favDrinkArr = [];
    let favFlavorArr = [];
    let dietRestArr = [];
    let foodAllergyArr = [];

    const getData = async () => {
        const response = await fetch(buildPath("api/getOneProfile"), {
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
            setNickName(data.NickName)
            setPronouns(data.Pronouns)
            setAccountType(data.AccountType)
            setCuisine(data.FavCuisine)
            setDrink(data.FavDrink)
            setFood(data.FavFood)
            setFlavor(data.FavoriteFlavor)
            setProfilePic(data.ProfilePhoto)
        }
    }

    //const handleModal = () => {
    //    getData();
    //   setModalVisible(true);
    //}

    return (
        <div>
            {(profilePic == '')? 
                <img src={Chef} className="chef" alt="pixelated person with chef coat and chef hat on." />
                :
                <img src={{ uri: profilePic }} alt="User's profile photo "/>
            }
            <div className="following">
                Foodies: 1
                
                Fooders: 2
            </div>
            
            <div className="bio">
                Nick-Name: {nickName}
                <br />
                Bio:
                <br />
                Favorite Cuisine:
                <br />
                Favorite Drink:
                <br />
                Favorite Food:
                <br />
                Favorite Flavor:
            </div>

        </div>
    )
}

export default ProfileSum;

