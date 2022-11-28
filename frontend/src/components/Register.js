// import { set } from "mongoose";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { buildPath } from "./bPath";
import { useCookies } from "react-cookie";


import NavBarLanding from "./NavBar-Components/NavBarLanding";
import ChefHat from "./Images/chefHat.png";

function Register() {
	var fs;
	var ls;
	var un;
	var email;
	var pass;
	var reType;

	const navigate = useNavigate();

	const [message, setMessage] = useState("");
	const [cookies, setCookie] = useCookies(["user"]);
	const defaultProfilePic = ChefHat;


	const doRegister = async (event) => {
		event.preventDefault();

		var obj = {
			FirstName: fs.value,
			LastName: ls.value,
			UserName: un.value,
			Email: email.value,
			Password: pass.value,
		};
		var js = JSON.stringify(obj);

		if (
			fs.value === "" ||
			ls.value === "" ||
			un.value === "" ||
			email.value === "" ||
			pass.value === ""
		) {
			setMessage("Please fill in all fields.");
			return;
		} else if (un.value.length < 4 || pass.value.length < 8) {
			setMessage(
				"Please make sure username and password are at least 8 characters long.",
			);
			return;
		} else if (reType.value !== pass.value) {
			setMessage("Passwords don't match.");
			return;
		} else {
			try {
				const response = await fetch(buildPath("api/register"), {
					method: "POST",
					body: js,
					headers: {
						"Content-Type": "application/json",
						"Accept": "application/json",
					},
				});

				var res = JSON.parse(await response.text());

				if (res.error === "Username taken. Try again.") {
					//api returns this error message so if user/pass is taken
					setMessage("Username taken. Try again.");
					return;
				} else {
					setMessage(" ");
					initializeProfile(res._id)
					window.location.href = "/login";
				}
			} catch (e) {
				alert(e.toString());
				return;
			}
		}
	};

	async function initializeProfile(freshID) {
        const response = await fetch(buildPath("api/editProfile"), {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			},
			body: JSON.stringify({
                NickName: "New Chef",
                DietRest: "",
                FavCuisine: "",
                FavDrink: "",
                FavFood: "",
                FavoriteFlavor: "",
                FoodAllerg: "",
                userId: freshID,
                AccountType: "",
                // PersonalFeedID: global._id,
                pronouns: "",
                ProfilePhoto: defaultProfilePic
			}),
		}).catch(err => {
			console.log(err);
		})

        const dataret = await response.json()
    }

	return (
		<div>
			<NavBarLanding />

			<img src={ChefHat} className="chefHat" alt="White Chef Hat." />

			<div id="loginDiv" className="registerForm">
				<form onSubmit={doRegister}>
					<p>First Name</p>
					<input
						type="text"
						id="FirstName"
						placeholder="Gordon"
						ref={(c) => (fs = c)}
					/>
					<p>Last Name</p>
					<input
						type="text"
						id="LastName"
						placeholder="Ramsey"
						ref={(c) => (ls = c)}
					/>
					<p>Email</p>
					<input
						type="email"
						id="Email"
						placeholder="GRam@gmail.com"
						ref={(c) => (email = c)}
					/>
					<p>Username</p>
					<input
						type="text"
						id="loginName"
						placeholder="Username"
						ref={(c) => (un = c)}
					/>
					<p>Password</p>
					<input
						type="password"
						id="loginPassword"
						placeholder="********"
						ref={(c) => (pass = c)}
					/>
					<p>Confirm Password</p>
					<input
						type="password"
						id="Password Retype"
						placeholder="********"
						ref={(c) => (reType = c)}
					/>{" "}
					<br />
					<button
						type="submit"
						className="login"
						onClick={doRegister}
					>
						Register
					</button>
				</form>

				<button className="link-btn" onClick={() => navigate("/login")}>
					Returning Chef?
				</button>

				<span id="registerResult">{message}</span>
			</div>
		</div>
	);
}

export default Register;
