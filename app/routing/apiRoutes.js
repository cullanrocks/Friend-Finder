// DEPENDENCIES -------------------------------------

var path = require('path');
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

apiPostGet = function(app) {
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

module.exports = apiPostGet;
