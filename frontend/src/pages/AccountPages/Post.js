import React from "react";
import "./Popup.css";
import { useCookies } from "react-cookie";

function Post() {
	const [cookies, setCookie] = useCookies(["user"]);

	return (
		<div className="post">
			<div className="postHeader">
				<h3>UserName</h3>
			</div>

			<image
				className="postImage"
				src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"
			></image>

			<h4 className="postText">
				<strong>UserName: </strong>caption
			</h4>
		</div>
	);
}

export default Post;
