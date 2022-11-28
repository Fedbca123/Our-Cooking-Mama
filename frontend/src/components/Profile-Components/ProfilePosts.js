import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { buildPath } from "../bPath";
import { useCookies } from "react-cookie";

import Chef from "./../Images/chef.png";

export const ProfilePosts = (props) => {
	const navigate = useNavigate();
	const [cookies, setCookie] = useCookies(["user"]);
	const [posts, setPosts] = useState([]);

	React.useEffect(() => {
		const callAPI = () => {
			getPosts();
		};
		callAPI();
	}, []);

	const getPosts = async () => {
		const response = await fetch(buildPath("api/getPersonalFeed"), {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
			},
			body: JSON.stringify({
				UserID: cookies.id,
			}),
		}).catch((err) => {
			console.log(err);
		});
		const data = await response.json();
		console.log("DAT IS " + data)
		setPosts(data)
		if (data.error == "User profile not found.") {
			console.log("not slay!");
		}
	};


	function MainFeed() {
		console.log(posts)
		if (posts.error != "No posts found.") {
			console.log("good")
			return (
				<div>
					{
						posts.map((item) =>
							<div key={item._id}>
								<img
									src={item.Photo}
									width="500"
									height="500"
									alt="UserPhoto"
								/>
							</div>)
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
		<div className="post">
			<MainFeed></MainFeed>
			{/* this is the bottom border line lmao why is it like this */}
			<div
				style={{
					borderTop: "2px solid #fff ",
					marginLeft: 20,
					marginRight: 20,
				}}
			></div>
		</div>
	);
};

export default ProfilePosts;
