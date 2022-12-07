// import cors from 'cors' import isn't needed as require is used ten lines down.
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const path = require("path");

const app = express();
const routes = require("./routes");
var bodyParser = require("body-parser");
const port = process.env.PORT || 3000;

function requireHTTPS(req, res, next) {
	// The 'x-forwarded-proto' check is for Heroku
	if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== "development") {
	  return res.redirect('https://' + req.get('host') + req.url);
	}
	next();
}

app.use(express.json());
app.use(requireHTTPS);
app.use("/api", routes);
app.use(cors());
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

// -------- Heroku deployment -------- 
__dirname = path.resolve();

if (process.env.NODE_ENV === 'production') 
{
  app.use(express.static("frontend/build"));
  app.get("/*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "./frontend/build", "index.html"),
      function (err) {
        if (err) {
          res.status(500).send(err);
        }
      }
    );
  });
}
// -------- Heroku deployment -------- 


});