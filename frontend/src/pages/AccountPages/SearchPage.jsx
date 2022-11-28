import React, { useState, useEffect } from "react";
import Popup from 'reactjs-popup';
import { useCookies } from "react-cookie";
import NavBar from '../../components/NavBar-Components/NavBar';
import './Popup.css';
import { buildPath } from "../../components/bPath";
import Post from "./PostSearchResult";
import Recipe from "./RecipeSearchResult";
import Profile from "./ProfileSearchResult";
import Card from "../../components/SearchResults-Components/RecipeCard";
import ProfileSearchResult from "./ProfileSearchResult";

export const SearchPage = (props) => {

    //Cookies Variables
    const [cookies, setCookie] = useCookies(["user"]);
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        console.log("QUERY IS: " + cookies.searchQuery)
        doSearch(cookies.searchQuery)
    }, []);


    if (cookies.id <= 0) {
        window.location.href = "/login";
    } //once cookie expires, logout user

    const doSearch = async (query) => {
        console.log(query)
        var obj = { Query: query };
        var js = JSON.stringify(obj);
        try {
            const response = await fetch(buildPath("api/universalSearch"), {
                method: "POST",
                body: js,
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
            });

            var res = JSON.parse(await response.text());
            setSearchResult(res)
        } catch (e) {
            alert(e.toString());
            return;
        }
    }

    function UserFeed(prop) {
        if (typeof searchResult.Users != "undefined") {
            // console.log("good")
            return (
                <div>
                    {
                        searchResult.Users.map((item) =>
                            <div key={item._id}>
                                <ProfileSearchResult user={item}></ProfileSearchResult>
                            </div>)
                    }
                </div>
            )
        } else {
            return (
                <div>
                    No users found!
                </div>
            )
        }
    }

    function PostFeed(prop) {
        if (typeof searchResult.Posts != "undefined") {
            // console.log("good")
            return (
                <div>
                    {
                        searchResult.Posts.map((item) =>
                            <div key={item._id}>
                                <Post post={item}></Post>
                            </div>)
                    }
                </div>
            )
        } else {
            return (
                <div>
                    No posts found!
                </div>
            )
        }
    }

    function RecipeFeed(prop) {
        if (typeof searchResult.Recipes != "undefined") {
            // console.log("good")
            return (
                <div>
                    {
                        searchResult.Recipes.map((item) =>
                            <div key={item._id}>
                                <Recipe recipe={item}></Recipe>
                            </div>)
                    }
                </div>
            )
        } else {
            return (
                <div>
                    No recipes found!
                </div>
            )
        }
    }

    return (
        <><NavBar />
            <h1>Search Results</h1>
            <h2 style={{ color: 'red' }}>Post Results</h2>
            <div>
                <PostFeed prop={searchResult}></PostFeed>
            </div>
            <h2 style={{ color: 'red' }}>Recipe Results</h2>
            <div>
                <RecipeFeed prop={searchResult}></RecipeFeed>
            </div>
            <h2 style={{ color: 'red' }}>User Results</h2>
            <div>
                <UserFeed prop={searchResult}></UserFeed>
            </div>
        </>
    );
}

export default SearchPage;