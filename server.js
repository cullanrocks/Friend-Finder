// DEPENDENCIES -------------------------------------
var express = require('express');
var app = express();
var http = require('http');
var fs = require('fs');
var bodyParser = require('body-parser');
var path = require('path');

var getUrl = require("./app/routing/htmlRoutes.js");
var apiPostGet = require("./app/routing/apiRoutes.js");

var PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static('app/'));
app.use(express.static('app/public/'));
// SAMPLE USERS -------------------------------------
var matcheesArray = [{
    name: "Mila",
    results: [5, 4, 3, 1, 5, 5, 3, 4, 3, 4],
    image: "./assets/images/mila.jpg"
}, {
    name: "Kate",
    results: [1, 1, 2, 2, 1, 3, 2, 3, 4, 1],
    image: "./assets/images/Kate.jpg"
}, {
    name: "Charlize",
    results: [3, 3, 4, 3, 3, 3, 3, 2, 2, 5],
    image: "./assets/images/charlize.jpg"
}, {
    name: "Zooey",
    results: [4, 4, 5, 5, 4, 2, 5, 4, 5, 5],
     image: "./assets/images/zooey.jpg"
}, {
    name: "Natalie",
    results: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    image: "./assets/images/natalie.jpg"
}];
// VARIABLES ---------------------------------------a
var usersMatchesArray = [];
var matchArray = [];
var userScore = 0;
var matchCompatibilityScore = 0;

// app.use(getUrl(app));
// app.use(apiPostGet(app));

getUrl(app)
apiPostGet(app)

app.listen(PORT, function() {
    console.log(`App listening on PORT ${PORT}`);
})
