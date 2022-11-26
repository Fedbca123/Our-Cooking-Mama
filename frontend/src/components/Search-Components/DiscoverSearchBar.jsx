import React, { useState } from "react";
import { useHistory, useNavigate } from 'react-router-dom';

import NavBar from '../../components/NavBar-Components/NavBar';
import Card from '../../components/Recipes-Display/Card';

export const SearchPage = (props) => {
    //Set in Case of Error
    const[error, setError] = useState(null);

    //Set Search Query to Empty String
    const[q, setQ] = useState("");

    //Function to Call Universal Search API (Search for Profiles, Posts, or Recipes)
    async function loadSearchFeed(event){
        event.preventDefault();
        
        const response = await fetch(buildPath("api/getMainFeed"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                ProfileID: global._id,
            }),
        }).catch(err => {
            console.log(error);
        });
        const data = await response.json()
    }

    return (
        <div>
            <NavBar />
            <div className="SearchPage">
                <h1>Search for Your Food Adventure!</h1>

                {/*Search Bar Component*/}
                <div className="search-wrapper">
                    <label htmlFor="search-form">
                        <input 
                            type="search"
                            name="search-form"
                            id="search-form"
                            className="search-input"
                            placeholder="Searching for..."
                            value={q} /*setting the value of useState q any time the user types in the search box */
                            onChange={ (e) => setQ(e.target.value) }
                        />
                    </label>
                </div>
            </div>
        </div>
    )
}

export default SearchPage;