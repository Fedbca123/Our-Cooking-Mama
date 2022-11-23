import React, { useState } from "react";
import Popup from "../../components/PopUp/popUp";
import { useCookies } from "react-cookie";
import NavBar from '../../components/NavBar-Components/NavBar';

export const HomePage = (props) => {

    const [buttonPopup, setButtonPopup] = useState(false);
    const [cookies, setCookie] = useCookies(["user"]);

    if(cookies.id <= 0){
        window.location.href = "/login";
    } //once cookie expires, logout user

    return (
            <><NavBar />
            <h1>Home Page</h1><button onClick={() => setButtonPopup(true)}>New Recipe</button><Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                <h3>Create A New Recipe</h3>
                <label className="imageUpload">Upload Your Dish</label>
                <input type="image" className="imageUpload">Image</input>
                
                
                
                
                </Popup></>
    );
}

export default HomePage;