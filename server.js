var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");

var Note = require("./models/Note.js");
var User = require("./models/User.js");

var mongoose = require("mongoose");
mongoose.Promise = Promise;

// Initialize Express
var app = express();

// Make public a static dir
app.use(express.static("public"));

// Database configuration with mongoose
if(process.env.NODE_ENV==="production"){
  mongoose.connect(process.env.MONGODB_URI);
} else  {
  mongoose.connect("mongodb://localhost/tech-news-scraper");
}
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

var PORT = 8080;

app.use(express.static(process.cwd() + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var myRoutes = require("./routes/routes.js");
app.use(myRoutes);

app.listen(process.env.PORT || PORT, function(){
  console.log("Server listening on PORT: "+PORT);
});
