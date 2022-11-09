const express = require("express");
const { connections } = require("mongoose");
const https = require("https");
const fs = require("fs");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const routes = require("./backend/api/routes");
var bodyParser = require("body-parser");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", routes);
app.use(bodyParser.json({ extended: false }));

app.listen(port, () => {
	console.log("Server started at port: " + port);
});

mongoose.connect(process.env.DATABASE_URI);
const database = mongoose.connection;

database.on("error", (error) => {
	console.log(error);
});

database.once("connected", () => {
	console.log("database connected");
});
