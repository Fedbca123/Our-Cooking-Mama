import React, { useState, useEffect } from "react";
import "./Popup.css";
import {
	Link
} from "react-router-dom";
import { useCookies } from "react-cookie";
import { buildPath } from "../../components/bPath";

function ProfileSearchResult({ user }) {
	const [cookies, setCookie] = useCookies(["user"]);
	const [profileStats, setProfile] = useState([]);
	const [recipeStats, setRecipe] = useState([]);
	return (
		<div className="post">
			<div className="postHeader">
				<h3>
					Username: <Link to="/searchProfile" state={{id: user._id}}>{user.UserName}</Link>
				</h3>
			</div>

			{/* this is the bottom border line lmao why is it like this */}
			<div style={{ borderTop: "2px solid #fff ", marginLeft: 20, marginRight: 20 }}></div>
		</div>
	);
}

export default ProfileSearchResult;
