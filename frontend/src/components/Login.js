import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { buildPath } from "./bPath";

import NavBarLanding from "./NavBar-Components/NavBarLanding";

function Login() {
	var loginName;
	var loginPassword;

	const navigate = useNavigate();

	const [message, setMessage] = useState("");

	const doLogin = async (event) => {
		event.preventDefault();

		var obj = { UserName: loginName.value, Password: loginPassword.value };
		var js = JSON.stringify(obj);

		if (loginName.value === "" || loginPassword.value === "") {
			setMessage("Please fill in both fields.");
			return;
		} else {
			try {
				const response = await fetch(buildPath("api/login"), {
					method: "POST",
					body: js,
					headers: {
						"Content-Type": "application/json",
						"Accept": "application/json",
					},
				});

				var res = JSON.parse(await response.text());

				if (res.id <= 0) {
					setMessage("User/Password combination incorrect");
				} else {
					var user = {
						FirstName: res.FirstName,
						LastName: res.LastName,
						_id: res._id,
					};
					localStorage.setItem("user_data", JSON.stringify(user));

					console.log(user);

					setMessage(" ");
					window.location.href = "/homepage";
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
				<form onSubmit={doLogin}>
					<h3>Username</h3>
					<input
						type="text"
						id="loginName"
						placeholder="Username"
						ref={(c) => (loginName = c)}
					/>{" "}
					<br />
					<h3>Password</h3>
					<input
						type="password"
						id="loginPassword"
						placeholder="********"
						ref={(c) => (loginPassword = c)}
					/>{" "}
					<br />
					<button type="submit" className="login" onClick={doLogin}>
						Login
					</button>
				</form>

				<br />

				<button
					className="link-btn"
					onClick={() => navigate("/register")}
				>
					New Chef?
				</button>

				<br />

				<span id="loginResult">{message}</span>
			</div>
		</div>
	);
}

export default Login;
