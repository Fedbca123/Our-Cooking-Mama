// import { set } from "mongoose";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { buildPath } from "./bPath";

import NavBarLanding from "./NavBar-Components/NavBarLanding";

function Register() {
	var fs;
	var ls;
	var un;
	var email;
	var pass;
	var reType;

	const navigate = useNavigate();

	const [message, setMessage] = useState("");

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
					// var user = {
					// 	FirstName: res.FirstName,
					// 	LastName: res.LastName,
					// 	_id: res._id,
					// };
					// localStorage.setItem("user_data", JSON.stringify(user));

					// console.log(user);

					setMessage(" ");
					window.location.href = "/login";
				}
			} catch (e) {
				alert(e.toString());
				return;
			}
		}
	};

	return (
		<div>
			<NavBarLanding />
			<div id="loginDiv">
				<form onSubmit={doRegister}>
					<h3>First Name</h3>
					<input
						type="text"
						id="FirstName"
						placeholder="Gordon"
						ref={(c) => (fs = c)}
					/>
					<br />
					<h3>Last Name</h3>
					<input
						type="text"
						id="LastName"
						placeholder="Ramsey"
						ref={(c) => (ls = c)}
					/>
					<h3>Email</h3>
					<input
						type="email"
						id="Email"
						placeholder="GRam@gmail.com"
						ref={(c) => (email = c)}
					/>
					<br />
					<br />
					<h3>Username</h3>
					<input
						type="text"
						id="loginName"
						placeholder="Username"
						ref={(c) => (un = c)}
					/>
					<br />
					<h3>Password</h3>
					<input
						type="password"
						id="loginPassword"
						placeholder="********"
						ref={(c) => (pass = c)}
					/>
					<br />
					<h3>Confirm Password</h3>
					<input
						type="password"
						id="loginPassword"
						placeholder="********"
						ref={(c) => (reType = c)}
					/>
					<br />
					<button
						type="submit"
						className="login"
						onClick={doRegister}
					>
						Register
					</button>
				</form>
				<br />
				<button className="link-btn" onClick={() => navigate("/login")}>
					Returning Chef?
				</button>

				<br />

				<span id="registerResult">{message}</span>
			</div>
		</div>
	);
}

export default Register;
