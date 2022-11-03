const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const path = require("path");
const PORT = process.env.PORT || 3000;
const app = express();
app.set("port", process.env.PORT || 3000);
app.use(cors());
app.use(bodyParser.json());

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
	// Set static folder
	app.use(express.static("frontend/build"));

	app.get("*", (req, res) => {
		res.sendFile(
			path.resolve(__dirname, "frontend", "build", "index.html"),
		);
	});
}

const MongoClient = require("mongodb").MongoClient;
const url = process.env.MONGODB_URI;

const client = new MongoClient(url);
client.connect();

app.post("/api/login", async (req, res, next) => {
	// incoming: login, password
	// outgoing: id, firstName, lastName, error

	var error = "";

	const { login, password } = req.body;

	const db = client.db("COP4331Cards");
	const results = await db
		.collection("Users")
		.find({ Login: login, Password: password })
		.toArray();

	var id = -1;
	var fn = "";
	var ln = "";

	if (results.length > 0) {
		id = results[0].UserID;
		fn = results[0].FirstName;
		ln = results[0].LastName;
	}

	var ret = { id: id, firstName: fn, lastName: ln, error: "" };
	res.status(200).json(ret);
});

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization",
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PATCH, DELETE, OPTIONS",
	);
	next();
});

app.listen(PORT, () => {
	console.log("Server listening on port " + PORT);
});
