import React, { useState } from "react";
import { useHistory, useNavigate } from 'react-router-dom';

import NavBar from '../../components/NavBar-Components/NavBar';

export const SearchPage = (props) => {
    const navigate = useNavigate();

    const[error, setError] = useState(null);
    const[isLoaded, setIsLoaded] = useState(false);
    const[items, setItems] = useState([]);

    //Set Search Query to Empty String
    const[q, setQ] = useState("");

    //Function to Call Universal Search API (Search for Profiles or Recipes)
    async function search(event){
        event.preventDefault();
        
        //Include more code...
    }

    return (
        
        <div>
            <NavBar />
            <div className="SearchPage">
                <h1>Search for Your Adventure!</h1>

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
                            onChange={ (e) => setQ(e.target.value)}
                        />
                    </label>
                </div>

                {/*Results Display Component*/}
                <div className="results-wrapper">
                    <ul className="card-grid">
                        <li>

                        </li>
                    </ul>
                </div>
                
            </div>
        </div>
    )
}

export default SearchPage;