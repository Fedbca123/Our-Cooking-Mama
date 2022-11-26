import React, { useState } from "react";
import Popup from 'reactjs-popup';
import { useCookies } from "react-cookie";
import NavBar from '../../components/NavBar-Components/NavBar';
import './Popup.css';
import { buildPath } from "../../components/bPath";

export const HomePage = (props) => {

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
    async function validateSearchFeed(event){

        //Variables for Checking Results after Universal Search Call
        let usersExist = false;
        let postsExist = false;
        let recipesExist = false;

        if(!data.error){
            if(data.Users.length > 0) {
                usersExist = true;
            } else { usersExist = false; }
            
            if(data.Posts.length > 0) {
                postsExist = true;
            } else { postsExist = false; }

            if(data.Recipes.length > 0) {
                recipesExist = true;
            } else { recipesExist = false; }
        }
    }

    //Results if Users Are Searched
    const SearchUserFeed = ({ usersExist, data }) => {
        let content
        if(usersExist) {
            content = <Text>{data.Users[0].UserName}</Text>
        } else {content = <Text>No users match your quest search!</Text>}

        return content
    }

    //Results if Posts are Searched
    const SearchPostFeed = ({ postsExist, data }) => {
        let content
        if(postsExist) {
            content = <Text>{data.Posts[0].Photo}</Text>
        } else {content = <Text>No posts match your quest search!</Text>}

        return content
    }

    //Results if Recipes are Searched
    const SearchRecipeFeed = ({ recipesExist, data }) => {
        let content
        if(recipesExist) {
            content = <Text>{data.Recipes[0].Recipe}</Text>
        } else {content = <Text>No recipes match your quest search! Is this a new route for you to create?</Text>}

        return content
    }

    return (
            <><NavBar />
            <h1>Home Page</h1>
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


            </>
    );
}

export default HomePage;