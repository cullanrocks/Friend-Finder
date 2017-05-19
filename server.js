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

getUrl(app)
apiPostGet(app)

app.listen(PORT, function() {
    console.log(`App listening on PORT ${PORT}`);
})
