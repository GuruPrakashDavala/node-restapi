const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var cors = require('cors');
require("dotenv/config"); //access to .env file by writing process.env.nameofvaruable

//User Body-Parser to access request body
// parse application/json
app.use(bodyParser.json());

//use cors package
app.use(cors());

//Connect to db
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to DB")
);

//Import Routes
const postsRoutes = require("./routes/posts");

//configuration of routes
//reason using routes so that we can have multiple webpages with different routes
app.use("/posts", postsRoutes);

//Routes
app.get("/", (req, res) => {
  //res.json("hello");
  var today = new Date()

  res.send("your api is working fine today " + today)
});
const port = process.env.PORT || 80;
app.listen(port);

//mongodb+srv://guru:<password>@cluster0.b7qnq.mongodb.net/<dbname>?retryWrites=true&w=majority
//password - FJlIXNHRBpVb8iM8
//dbname - test
