import React, { useState, useEffect } from "react";
import "./Popup.css";
import { useCookies } from "react-cookie";
import { buildPath } from "../../components/bPath";

function RecipeSearchResult({ recipe }) {
	const [cookies, setCookie] = useCookies(["user"]);
	const [profileStats, setProfile] = useState([]);
	const [recipeStats, setRecipe] = useState([]);

	return (
		<div className="post">
			<div className="postHeader">
				<h3>
					Recipe Name: {recipe.Recipe}
				</h3>
			</div>

			<h4 className="postText">
				<strong>Ingredients: {recipe.Ingredients} </strong>
			</h4>

			<h4 className="postTag">
				<strong>Created by: {recipe.ChefID} </strong>
			</h4>

			{/* this is the bottom border line lmao why is it like this */}
			<div style={{ borderTop: "2px solid #fff ", marginLeft: 20, marginRight: 20 }}></div>
		</div>
	);
}

export default RecipeSearchResult;
