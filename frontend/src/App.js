import React, { useState } from "react";
import { Helmet } from "react-helmet";
import {
	BrowserRouter as BrowserRouter,
	Route,
	Routes,
} from "react-router-dom";
import "./App.css";

//import { Login } from "./components/Login";
//import { Register } from "./components/Register";
//import { HomePage } from "./components/HomePage";

// import BuildPath from "./components/bPath";

// Landing Page imports
import LandingPage from "./pages/LandingPages/LandingPage";
import LoginPage from "./pages/LandingPages/LoginPage";
import RegisterPage from "./pages/LandingPages/RegisterPage";
import AboutUs from "./pages/LandingPages/AboutUs";

// Account Page imports
import HomePage from "./pages/AccountPages/HomePage";
import ProfilePage from "./pages/AccountPages/ProfilePage";
import SearchProfilePage from "./pages/AccountPages/SearchProfilePage"
import SearchPage from "./pages/AccountPages/SearchPage";
import EditProfile from "./pages/AccountPages/EditProfile";
import OtherProfile from "./pages/AccountPages/SearchProfilePage"

// // Cookies imports
// // import { useCookies } from "react-cookie";
// import Cookie from "universal-cookie";

// // Components imports
// import NavBar from "./components/NavBar-Components/NavBar";
// import NavBarLanding from "./components/NavBar-Components/NavBarLanding";
// import Card from "./components/SearchResults-Components/RecipeCard";
import ResetPass from "./pages/LandingPages/ResetPass";
import SendEmail from "./pages/LandingPages/SendEmail";

function App() {
	//const [currentForm, setCurrentForm] = useState("login");
	// const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);

	//const toggleForm = (formName) => {
	//	setCurrentForm(formName);
	//};

	return (
		<div className="App">
			<Routes>
                <Helmet>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                {<link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet" />}
                </Helmet>
				<Route path="/" element={<LandingPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/about-us" element={<AboutUs />} />
				<Route path="/SendEmail" element={<SendEmail />} />

				<Route path="/ResetPass" element={<ResetPass />} />

				<Route path="/homepage" element={<HomePage />} />
				<Route path="/profile" element={<ProfilePage />} />
				<Route path="/editProfile" element={<EditProfile />} />
				<Route path="/search" element={<SearchPage />} />
				<Route path="/searchProfile" element={<SearchProfilePage/>}/>
			</Routes>
		</div>
	);
}

export default App;

// this can be added back later if need be
//<Route path="/search" element={<SearchPage />} />
