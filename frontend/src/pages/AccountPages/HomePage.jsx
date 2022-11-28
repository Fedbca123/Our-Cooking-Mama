import React, { useState, useEffect } from "react";
import Popup from 'reactjs-popup';
import { useCookies } from "react-cookie";
import NavBar from '../../components/NavBar-Components/NavBar';
import './Popup.css';
import { buildPath } from "../../components/bPath";
import Post from "./Post";
// eslint-disable-next-line no-unused-vars
import Card from "../../components/SearchResults-Components/RecipeCard";
// import { post } from "../../../../backend/api/routes";

export const HomePage = (props) => {
    //Search Functionality Variables
    // const[error, setError] = useState(null); //Set in Case of Error
    // const[query, setQuery] = useState("");  //Set Search Query to Empty String
    // const[profilesExist, setProfilesExist] = useState(false);
    // const[postsExist, setPostsExist] = useState(false);
    // const[recipesExist, setRecipesExist] = useState(false);
    // const[profilesArray, setProfilesArray] = useState([]);
    // const[postsArray, setPostsArray] = useState([]);
    // const[recipesArray, setRecipesArray] = useState([]);
    // var q;

    //Cookies Variables
    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookie] = useCookies(["user"]);
    //variables for add Post
    const [title, setTitle] = useState("");
    // const [category, setCategory] = useState("");
    const [caption, setCaption] = useState("");
    var tagString;
    var tags;
    //variables for add recipe
    const [recipeName, setRecipeName] = useState("");
    const [chefName, setChefName] = useState("")
    const [recipe, setRecipe] = useState("");
    const [posts, setPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    var ingredientString;
    var ingredients;

    useEffect(() => {
        console.log("HELLO")
        loadPost();
    }, []);

    const loadPost = async () => {

        var obj = { ProfileID: cookies.id };
        var js = JSON.stringify(obj);
        try {
            const response = await fetch(buildPath("api/getMainFeed"), {
                method: "POST",
                body: js,
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
            });

            var res = JSON.parse(await response.text());
            setPosts(res.posts)
        } catch (e) {
            alert(e.toString());
            return;
        }
    }


    const [file, setFile] = useState();
    function handleChange(event) {
        setFile(event.target.files[0]);
    }


    if (cookies.id <= 0) {
        window.location.href = "/login";
    } //once cookie expires, logout user

    async function addRecipe(event) {

        var obj = { Ingredients: ingredients, Name: recipeName.target.value, ChefID: chefName.value };
        var js = JSON.stringify(obj);


        if (ingredientString === "" || recipeName.target.value === "") {
            console.log("Please fill in all fields.");
            return "-1";
        } else {
            try {
                const response = await fetch(buildPath('api/addRecipe'), {
                    method: "POST",
                    body: js,
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                });

                var res = JSON.parse(await response.text());

                console.log("Recipe ID: " + res._id);

                if (res._id <= 0 || res._id === undefined || res._id === null) {
                    return "63772881990a71a5cf2ff956";
                } else {
                    return res._id;
                }


            } catch (e) {

            }
        }

        return "63772881990a71a5cf2ff956";

    }

    async function addPost(event) {
        tags = tagString.value.split(" ");
        ingredients = ingredientString.value.split(",");
        // console.log(title.target.value);
        // console.log(photo_url.value);
        // console.log(tags);
        // console.log(caption.target.value);

        let recipeID = await addRecipe();

        console.log(typeof (recipeID));
        // console.log(recipeID.target.value);
        console.log(recipeID);

        if (recipeID != "-1" || recipeID === undefined) {
            let formdata = new FormData();
            formdata.append("UserID", cookies.id);
            // api doensnt like recipe id as -1 it needs something that looks like below
            formdata.append("RecipeID", recipeID);
            formdata.append("Category", title.target.value);
            formdata.append("Caption", caption.target.value);
            formdata.append("Tags", tags);
            // formdata.append('file', photo_url.files[1], 'file.jpg');
            formdata.append('file', file);

            const response = await fetch(buildPath('api/addPost'), {
                method: 'POST',
                body: formdata,
            }).then(response => {
                console.log("IMAGE UPLOADED!!!")
            }).catch(err => {
                console.log(err);
            });
        }



    }

    function handleSearch(event) {
        setCookie("searchQuery", searchQuery, { path: "/" });
        window.location.href = "/search";
    }

    function handleChange(event) {
        setSearchQuery(event.target.value)
    }

    function MainFeed() {
        console.log("hello " + posts)
        if (typeof posts !== 'undefined') {
            console.log("good")
            return (
                <div>
                {
                    posts.map((item) =>
                        item.map((item) =>
                            <div key={item._id}>
                                <Post post={item} />
                            </div>)
                    )
                }
            </div>
            )
        } else {
            console.log("bad")
            return (
                <div>
                    No posts found!
                </div>
            )
        }
    }

    return (
        <><NavBar />
            <h1>Home Page</h1>

            {/* Search Bar Component */}
            <h2>Search for Your Food Adventure!</h2>
            <div className="search-wrapper">
                <label htmlFor="search-form">
                    <input
                        type="search"
                        name="search-form"
                        id="search-form"
                        className="search-input"
                        placeholder="Searching for..."
                        //   value={q} //setting the value of useState q any time the user types in the search box  
                        onChange={handleChange}
                    //   onChange={ displaySearchFeed(q) } // Unsure if this is where to make call to displaySearchFeed 
                    />
                </label>
                <button onClick={handleSearch}>Search</button>
            </div>


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
                            <input type="file" onChange={handleChange} />
                            <br />
                            Write a caption:
                            <input type="text" onChange={(val) => setCaption(val)}></input>
                            <br />
                            What tags do you wanna add?
                            <input type="text" placeholder="#sweet #nutallergy" ref={(c) => { tagString = c }}></input>
                            <br />
                            What is the recipe for this dish?
                            <input type="text" placeholder="" onChange={(val) => setRecipe(val)}></input>
                            <br />
                            Who made this recipe?
                            <input type="text" placeholder="Mama's homemade chicken" onChange={(val) => setChefName(val)}></input>
                            <br />
                            What is the name of the recipe?
                            <input type="text" placeholder="Mama, Me" onChange={(val) => setRecipeName(val)}></input>
                            <br />
                            Please list ingredients used: (separate each with a comma)
                            <input type="text" placeholder="ex. salt, pepper, chicken breast" ref={(c) => { ingredientString = c }}></input>
                        </div>
                        <div className="actions">
                            <button onClick={() => { addPost(); close(); }}>Submit</button>

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

            {/* this is where posts are rendered! */}
            {/* <div>
                {
                    posts.map((item) =>
                        item.map((item) =>
                            <div key={item._id}>
                                <Post post={item} />
                            </div>)
                    )
                }
            </div> */}

            <MainFeed></MainFeed>


            {/* <Card/> */}


        </>
    );
}

export default HomePage;