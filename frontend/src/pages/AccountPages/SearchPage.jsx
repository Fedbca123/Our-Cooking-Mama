import React, { useState } from "react";
import { useHistory, useNavigate } from 'react-router-dom';

import NavBar from '../../components/NavBar-Components/NavBar';
import Card from '../../components/Recipes-Display/Card';

export const SearchPage = (props) => {
    //Set in Case of Error
    const[error, setError] = useState(null);

    //Set Search Query to Empty String
    const[q, setQ] = useState("");

    //Set Variables for Search Results
    const[userExist, setUsersExisting] = useState(false);
    const[postsExist, setPostsExisting] = useState(false);
    const[recipesExist, setRecipesExisting] = useState(false);
    //const[isLoaded, setIsLoaded] = useState(false);
    //const[items, setItems] = useState([]);

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

    //Function to Check Results from Universal Search API
    async function validateSearchFeed(event){
        if(!data.error){
            if(data.Users.length > 0) {
                (usersExist) => setUsersExisting(true)
            } else { (usersExist) => setUsersExisting(false) }
            
            if(data.Posts.length > 0) {
                (postsExist) => setPostsExisting(true)
            } else { (postsExist) => setPostsExisting(false) }

            if(data.Recipes.length > 0) {
                (recipesExist) => setRecipesExisting(true)
            } else { (recipesExist) => setRecipesExisting(false) }
        }
    }

    //Results if Users Are Searched
    const SearchUserFeed = ({ usersExist, data }) => {
        let content
        if(usersExist) {
            content = <Text></Text>
        } else {content = <Text></Text>}

        return content
    }

    //Results if Posts are Searched
    const SearchPostFeed = ({ postsExist, data }) => {
        let content
        if(postsExist) {
            content = <Text></Text>
        } else {content = <Text></Text>}

        return content
    }

    //Results if Recipes are Searched
    const SearchRecipeFeed = ({ recipesExist, data }) => {
        let content
        if(recipesExist) {
            content = <Text></Text>
        } else {content = <Text></Text>}

        return content
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

                {/*Results Display for Recipe Cards Component */}
                <div className="results-wrapper">
                    <Card />
                </div>
            </div>
        </div>
    )
}

export default SearchPage;