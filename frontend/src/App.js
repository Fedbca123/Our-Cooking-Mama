import React, { useState } from "react";
import { BrowserRouter as BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

//import { Login } from "./components/Login";
//import { Register } from "./components/Register";
//import { HomePage } from "./components/HomePage";

import LoginPage from './components/Login';
import RegisterPage from './components/Register';
import HomePage from './pages/AccountPages/HomePage';
import ProfilePage from "./pages/AccountPages/ProfilePage";
import SearchPage from "./pages/AccountPages/SearchPage";
import LandingPage from "./pages/LandingPages/LandingPage";

import NavBar from "./components/NavBar-Components/NavBar";
import NavBarLanding from "./components/NavBar-Components/NavBarLanding";
import AboutUs from "./pages/LandingPages/AboutUs";

function App() {
	//const [currentForm, setCurrentForm] = useState("login");

	//const toggleForm = (formName) => {
	//	setCurrentForm(formName);
	//};

	return (
		<div className="App">
			<BrowserRouter >
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/about-us" element={<AboutUs />} />

				<Route path="/homepage" element={<HomePage />} />
				<Route path="/profile" element={<ProfilePage />} />
				<Route path="/search" element={<SearchPage />} />

				<Route path="/nav" element={<NavBar />} />
			</Routes>
		</BrowserRouter>
		</div>
	);
}

export default App;
