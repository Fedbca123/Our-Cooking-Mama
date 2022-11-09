import React, { useState } from "react";
import { BrowserRouter as BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

//import { Login } from "./components/Login";
//import { Register } from "./components/Register";
//import { HomePage } from "./components/HomePage";

import LoginPage from './components/Login';
import RegisterPage from './components/Register';
import HomePage from './components/HomePage';

function App() {
	//const [currentForm, setCurrentForm] = useState("login");

	//const toggleForm = (formName) => {
	//	setCurrentForm(formName);
	//};

	return (
		<div className="App">
			<BrowserRouter >
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/homepage" element={<HomePage />} />
			</Routes>
		</BrowserRouter>
		</div>
	);
}

export default App;
