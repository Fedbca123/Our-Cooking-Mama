import React, { useState } from "react";

import { buildPath } from "./../bPath";

import Chef from "./../Images/chef.png";
import { useCookies } from "react-cookie";

export const ProfileSum = (props) => {

    //const [modalVisible, setModalVisible] = useState(false);
    const [NickName, setNickName] = useState('');
    const [pronouns, setPronouns] = useState('');
    const [accountType, setAccountType] = useState('');
    const [favCuisine, setCuisine] = useState('');
    const [favDrink, setDrink] = useState('');
    const [favFood, setFood] = useState('');
    const [favFlavor, setFlavor] = useState('');
    const [profilePic, setProfilePic] = useState('');

    const [cookies, setCookie] = useCookies(["user"]);
    //const myCookie = cookies.get('cookie-name');

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
            setNickName(data.NickName)
            setPronouns(data.Pronouns)
            setAccountType(data.AccountType)
            setCuisine(data.FavCuisine)
            setDrink(data.FavDrink)
            setFood(data.FavFood)
            setFlavor(data.FavoriteFlavor)
            setProfilePic(data.ProfilePhoto)

            //console.log(data.FavCuisine)
            //console.log(cookies.id)
            //console.log(data)
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
                <img src={profilePic} className="chef"alt="User's profile photo "/>
            }
            <div className="following">
                Foodies: 1
                
                Fooders: 2
            </div>
            
            <div className="bio">
                {(NickName == '')?
                    <>No Nick Name</>
                    :
                    <>{NickName}</>
                }
                <br />
                {(pronouns == '')?
                    <>Our/Cooking/Mama</>
                    :
                    <>{pronouns}</>
                }
                <br />
                {(accountType == '')?
                    <>finish profile set up</>
                    :
                    <>{accountType}</>
                }
                {accountType}
                
            </div>

            <div className="profileFavs">
                Favorite Cuisine:
                <br />
                <>|   {favCuisine}</>
                <br />
                Favorite Drink:
                <br />
                <>|   {favDrink}</>
                <br />

                Favorite Food:
                <br />
                <>|   {favFood[0]} {favFood[1]} {favFood[2]} {favFood[3]} {favFood[4]} {favFood[5]} {favFood[6]} {favFood[7]} {favFood[8]}</>
                <br />
                
                Favorite Flavor:
                <br />
                <>|   {favFlavor[0]} {favFlavor[1]} {favFlavor[3]} {favFlavor[4]} {favFlavor[5]} {favFlavor[6]}</>
                <br />
                        
            </div>

        </div>
    );
}

export default ProfileSum;

