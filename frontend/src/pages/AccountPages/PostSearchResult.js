import React, { useState, useEffect } from "react";
import "./Popup.css";
import { useCookies } from "react-cookie";
import { buildPath } from "../../components/bPath";

function PostSearchResult({ post }) {
	const [cookies, setCookie] = useCookies(["user"]);
	const [profileStats, setProfile] = useState([]);
	const [recipeStats, setRecipe] = useState([]);

	// These will run one time when a post is rendered
	useEffect(() => {
		grabProfile();
		grabRecipe();
	}, []);

	const grabProfile = async () => {
		var obj = { Query: post.ProfileID };
		var js = JSON.stringify(obj);
		try {
			const response = await fetch(buildPath("api/getOneProfile"), {
				method: "POST",
				body: js,
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json",
				},
			});

			var res = JSON.parse(await response.text());
			setProfile(res)
		} catch (e) {
			alert(e.toString());
			return;
		}
	}

	const grabRecipe = async () => {
		console.log("recipe id Is " + post.RecipeID)
		var obj = { RecipeID: post.RecipeID };
		var js = JSON.stringify(obj);
		try {
			const response = await fetch(buildPath("api/getRecipe"), {
				method: "POST",
				body: js,
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json",
				},
			});

			var res = JSON.parse(await response.text());
			setRecipe(res)
		} catch (e) {
			alert(e.toString());
			return;
		}
	}

	return (
		<div className="post">
			<div className="postHeader">
				<h3>
					<img height='50' width='50' src={profileStats.ProfilePhoto}></img>
					Username: {profileStats.NickName} ({profileStats.Pronouns})
				</h3>
			</div>

			<div className="postImage">
				<img
					src={post.Photo}
					width='200'
					height='200'
				/>
			</div>

			<h4 className="postText">
				<strong>Caption: </strong>{post.Caption}
			</h4>

			<h4 className="postTag">
				<strong>Tags: </strong>{post.Tags}
			</h4>

			<h4 className="postRecipe">
				<strong>Recipe Name: </strong>{recipeStats.Recipe} <br></br>
				<strong>Recipe Ingredients: </strong>{recipeStats.Ingredients}
			</h4>

			{/* this is the bottom border line lmao why is it like this */}
			<div style={{ borderTop: "2px solid #fff ", marginLeft: 20, marginRight: 20 }}></div>
		</div>
	);
}

export default PostSearchResult;
