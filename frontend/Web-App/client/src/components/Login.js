import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
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

	const [message, setMessage] = useState("");

	const doLogin = async (event) => {
		event.preventDefault();

		var obj = { login: username.value, password: psw.value };
		var js = JSON.stringify(obj);

		try {
			//            const response = await fetch('http://localhost:5000/api/login',
			const response = await fetch(buildPath("api/login"), {
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
			<form onSubmit={doLogin}>
				<span id="inner-title">Log In</span>
				<br />
				<input
					type="text"
					id="loginName"
					placeholder="Username"
					ref={(c) => (username = c)}
				/>
				<br />
				<input
					type="password"
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
					onClick={doLogin}
				/>
				<button component={Link} to="/RegisterPage" />
			</form>
			<span id="loginResult">{message}</span>
		</div>
	);
}

export default Login;
