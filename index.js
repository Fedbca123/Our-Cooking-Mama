// import cors from 'cors' import isn't needed as require is used ten lines down.

const express = require("express");
const { connections } = require("mongoose");
const https = require("https");
const fs = require("fs");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet");
// Accessing the path module
const path = require("path");

const app = express();
const routes = require("./routes");
var bodyParser = require("body-parser");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", routes);
app.use(cors());
app.use(bodyParser.json({ extended: false }));
app.use(
    // [
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'", "'unsafe-inline'"],
        connectSrc: ['https://checkout.stripe.com'],
        frameSrc: ['https://checkout.stripe.com'],
        childSrc: ['https://checkout.stripe.com'],
        scriptSrc: ['https://checkout.stripe.com', "'unsafe-inline'"],
        styleSrc: [
          'https://fonts.googleapis.com',
          'https://checkout.stripe.com',
        ],
        fontSrc: ['https://fonts.gstatic.com', 'https://fonts.googleapis.com'],
        imgSrc: ['https://*.stripe.com', 'https://res.cloudinary.com'],
        baseUri: ["'self'"],
      },
    })
    // ]
  )

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
  app.use(express.static("client/build"));
  app.get("/*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../client/build", "index.html"),
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