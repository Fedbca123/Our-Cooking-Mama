import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./components/NavBar-Components/styles.css"
import { BrowserRouter } from "react-router-dom";

//ReactDOM.render(<App />, document.getElementById("root"));
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render (
     <React.StrictMode> 
          <BrowserRouter>
              <App />
          </BrowserRouter>
      </React.StrictMode>
)
