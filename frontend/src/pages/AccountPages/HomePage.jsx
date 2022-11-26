import React, { useState } from "react";
import Popup from 'reactjs-popup';
import { useCookies } from "react-cookie";
import NavBar from '../../components/NavBar-Components/NavBar';
import './Popup.css';
import { buildPath } from "../../components/bPath";
import Post from "./Post";
import Card from "../../components/SearchResults-Components/Card";

export const HomePage = (props) => {

    //Search Functionality Variables
    const[error, setError] = useState(null); //Set in Case of Error
    const[query, setQuery] = useState("");  //Set Search Query to Empty String
    const[profilesExist, setProfilesExist] = useState(false)
    const[postsExist, setPostsExist] = useState(false)
    const[recipesExist, setRecipesExist] = useState(false)
    const[profilesArray, setProfilesArray] = useState([])
    const[postsArray, setPostsArray] = useState([])
    const[recipesArray, setRecipesArray] = useState([])

    //Cookies Variables
    const [cookies, setCookie] = useCookies(["user"]);
    
    const [title, setTitle] = useState("");
    // const [category, setCategory] = useState("");
    const [caption, setCaption] = useState("");
    var tagString;
    var photo_url;
    var tags;
    

    if(cookies.id <= 0){
        window.location.href = "/login";
    } //once cookie expires, logout user

    async function addPost(event){
        tags = tagString.value.split(" ");
        // console.log(title.target.value);
        // console.log(photo_url.value);
        // console.log(tags);
        // console.log(caption.target.value);

        let formdata = new FormData();
        formdata.append("UserID", cookies.id);
        // api doensnt like recipe id as -1 it needs something that looks like below
        formdata.append("RecipeID", "63772881990a71a5cf2ff956");
        formdata.append("Category", title.target.value);
        formdata.append("Caption", caption.target.value);
        formdata.append("Tags", tags);
        formdata.append('file', photo_url.files[0], 'file.jpg');

            const response = await fetch(buildPath('api/addPost'), {
                method: 'POST',
                body: formdata,
            }).then(response => {
                console.log("IMAGE UPLOADED!!!")
		    }).catch(err => {
			    console.log(err);
		    });
    }

    //Function to Check Results from Universal Search API
    async function displaySearchFeed(event){
        setQuery(event.target.value);   //set what's typed to be the query value
        console.log("Searching...")

        const response = await fetch(buildPath("api/universalSearch"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                Query: query,
            }),
        }).catch(err => {
            console.log(error);
        });

        const data = await response.json()

        if(!data.error){
            console.log("Results found.")

            if(data.Users.length > 0) {
                setProfilesExist(true);
                setProfilesArray(data.Users);
            } else { setProfilesExist(false); }
            
            if(data.Posts.length > 0) {
                setPostsExist(true);
                setPostsArray(data.Posts);
            } else { setPostsExist(false); }

            if(data.Recipes.length > 0) {
                setRecipesExist(true);
                setRecipesArray(data.Recipes);
            } else { setRecipesExist(false); }
        }
        console.log(data)
    }

    //Results if Users Are Searched
    const SearchProfileFeed = () => {
        let content
        if(profilesExist) {
            //Need to feed profiles within profilesArray into card grid...is this the solution?
            {profilesArray.map((item, index) => {
                return(
                    <div className="col-11 col-md-6 col-lg-3 mx-0 mb-4">
                        <div className="card p-0 overflow-hidden h-100 shadow">
                            <img src={item.ProfilePhoto} className="card-img-top" />
                            <div className="card-body"> 
                                <h5 className="card-title">{item.UserName}</h5>
                            </div>
                        </div>
                    </div>
                )
            })}
        } else {content = <Text>No users match your quest search!</Text>}

        return content
    }

    //Results if Posts are Searched
    const SearchPostFeed = () => {
        let content
        if(postsExist) {
            //Need to feed posts within postsArray into card grid
            content = <Text>{postsArray[0].Photo}</Text> //this only prints the first result found for posts
        } else {content = <Text>No posts match your quest search!</Text>} 

        return content
    }

    //Results if Recipes are Searched
    const SearchRecipeFeed = () => {
        let content
        if(recipesExist) {
            //Need to feed recipes within recipesArray into card grid
            content = <Text>{recipesArray.Recipe}</Text> //this only prints the first result found for recipes
        } else {content = <Text>No recipes match your quest search! Is this something new for you to create?</Text>}

        return content
    }

    return (
            <><NavBar />
            <h1>Home Page</h1>

            {/*Search Bar Component*/}
            <h2>Search for Your Food Adventure!</h2>
            <div className="search-wrapper">
                <label htmlFor="search-form">
                    <input 
                        type="search"
                        name="search-form"
                        id="search-form"
                        className="search-input"
                        placeholder="Searching for..."
                        value={q} /*setting the value of useState q any time the user types in the search box */
                        //onChange={ (e) => setQuery(e.target.value) }
                        onChange={ displaySearchFeed(q) } /*Unsure if this is where to make call to displaySearchFeed*/
                    />
                </label>
            </div>

            <h3>Discover Profiles</h3>
            <SearchProfileFeed />

            <h3>Discover Posts</h3>
            <SearchPostFeed />

            <h3>Discover Recipes</h3>
            <SearchRecipeFeed />

            <Popup
            trigger={<button className="button"> Create Post </button>}
            modal
            nested
            >
                {close => (
                <div className="modal">
                    <button className="close" onClick={close}>
                    &times;
                    </button>
                    <div className="header"> Share Your Dish </div>
                    <div className="content">
                    {' '}
                    Title:
                    <input type="text" onChange={(val) => setTitle(val)}></input>
                    <br />
                    Add an image:
                    <input type="file" accept="iamge/*" ref={(c) => (photo_url = c)}></input>
                    <br />
                    Write a caption:
                    <input type="text" onChange={(val) => setCaption(val)}></input>
                    <br />
                    What tags do you wanna add?
                    <input type="text" placeholder="#sweet #nutallergy" ref={(c) => {tagString = c}}></input>
                    </div>
                    <div className="actions">
                    <button onClick={addPost}>Submit</button>
                    
                    <button
                        className="button"
                        onClick={() => {

                        close();
                        }}
                    >
                        Cancel
                    </button>
                    </div>
                </div>
                )}
            </Popup>

            <Post/>

            {/* <Card/> */}


            </>
    );
}

export default HomePage;