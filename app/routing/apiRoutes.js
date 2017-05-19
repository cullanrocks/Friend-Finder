var express = require('express');
var app = express();
var http = require('http');
var fs = require('fs');
var bodyParser = require('body-parser');
var path = require('path');

getFriends = function() {
    app.get("/api/friends", function(req, res) {
        var chosen = req.params.matcheesArray;
        if (chosen) {
            console.log(chosen);
            for (var i = 0; i < matcheesArray.length; i++) {
                if (chosen === matcheesArray[i].routeName) {
                    return res.json(matcheesArray[i]);
                }
            }
            return res.json(false);
        }
        return res.json(matcheesArray);
    })
}

postNew = function() {
    app.post("/api/friends", function(req, res) {
        usersMatchesArray = [];
        var request = req.body;
        var userInputs = Object.keys(request).map(function(key) {
            return (parseInt(request[key]));
        })

        for (var j = 0; j < matcheesArray.length; j++) {
            var scoreDifferenceArray = [];
            var matchCompatibilityScore = 0;
            for (var k = 0; k < matcheesArray[j].results.length; k++) {
                userScore = userInputs[k];
                matcheeScore = matcheesArray[j].results[k];
                var scoreDifference = Math.abs(userScore - matcheeScore);
                scoreDifferenceArray.push(scoreDifference);
                matchCompatibilityScore += scoreDifference;
                //The lower the compatibility score, the more compatible the two users are.
            }
            // console.log(scoreDifferenceArray)
            var usersMatch = { name: matcheesArray[j].name, testScoreSimiliarity: scoreDifferenceArray, matchCompatibilityScore: matchCompatibilityScore, image: matcheesArray[j].image };
            usersMatchesArray.push(usersMatch);
        }
        // PRINT THE OBJECT TO results.html PAGE
        res.send(usersMatchesArray);
    })
}

module.exports = getFriends;
module.exports = postNew;
