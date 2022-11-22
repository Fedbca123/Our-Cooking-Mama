import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./components/NavBar-Components/styles.css";
import "./components/PopUp/popup.css";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

//ReactDOM.render(<App />, document.getElementById("root"));
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<CookiesProvider>
		<React.StrictMode>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</React.StrictMode>
	</CookiesProvider>,
);
