import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
	const app_name = "your-cooking-mom";
	function buildPath(route) {
		if (process.env.NODE_ENV === "production") {
			return "https://" + app_name + ".herokuapp.com/" + route;
		} else {
			return "http://localhost:3000/" + route;
		}
	}

	var username;
	var psw;
	var fs;
	var ls;
	var email;

	const [message, setMessage] = useState("");

	const doRegister = async (event) => {
		event.preventDefault();

		var obj = {
			first_name: fs.value,
			last_name: ls.value,
			login: username.value,
			email: email.value,
			password: psw.value,
		};
		var js = JSON.stringify(obj);

		try {
			//            const response = await fetch('http://localhost:5000/api/login',
			const response = await fetch(buildPath("api/Register"), {
				method: "POST",
				body: js,
				headers: { "Content-Type": "application/json" },
			});

			var res = JSON.parse(await response.text());

			if (res.id <= 0) {
				setMessage("User/Password combination incorrect");
			} else {
				var user = {
					firstName: res.firstName,
					lastName: res.lastName,
					id: res.id,
				};
				localStorage.setItem("user_data", JSON.stringify(user));

				setMessage("");
				window.location.href = "/cards";
			}
		} catch (e) {
			alert(e.toString());
			return;
		}
	};

	return (
		<div id="loginDiv">
			<form onSubmit={doRegister}>
				<span id="inner-title">Log In</span>
				<br />
				<input
					type="text"
					id="first_name"
					placeholder="First Name"
					ref={(c) => (fs = c)}
				/>
				<br />
				<input
					type="text"
					id="last_Name"
					placeholder="Last Name"
					ref={(c) => (ls = c)}
				/>
				<input
					type="text"
					id="loginName"
					placeholder="Email Address"
					ref={(c) => (email = c)}
				/>
				<br />
				<br />
				<input
					type="text"
					id="loginName"
					placeholder="Username"
					ref={(c) => (username = c)}
				/>
				<br />
				<input
					type="text"
					id="loginPassword"
					placeholder="Password"
					ref={(c) => (psw = c)}
				/>
				<br />
				<input
					type="submit"
					id="loginButton"
					class="buttons"
					value="Do It"
					onClick={doRegister}
				/>
				<button component={Link} to="../pages/loginPage" />
			</form>
			<span id="loginResult">{message}</span>
		</div>
	);
}

export default Register;
