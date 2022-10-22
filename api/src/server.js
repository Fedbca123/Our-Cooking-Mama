// Include express
const express = require("express");

// This line puts Express in a variable called "app"
const app = express();
const bodyParser = require("body-parser");

// Include users.js file from routes directory
const userRoutes = require("./api/routes/users");

// Configure body-parser settings
app.use(bodyParser.urlencoded({extended: true }));

// Parse json with body-parser
app.use(bodyParser.json());

app.use("/v1/users", userRoutes);

// Server listening on port set in top variable, otherwise 3000
const port = process.env.PORT || 3000;

// Express returns HTTP server
app.listen(port, () => console.log("[Server] online " + new Date()));