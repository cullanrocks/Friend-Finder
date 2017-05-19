$(document).ready(function() {
    // -------------------------------       VARIABLES       ------------------------------------------------

    var questionsArray = ["Do you think the field of science trumps religion?", "Do you like cats?", "Do you like music?", "Are you an introvert?", "Is it time for Dodger baseball?", "Do you like to consume alcohol?", "Do you like to go to concerts?", "Do you like checking out new places?", "Do you like hiking and the outdoors?", "Are you a Democrat?"];
    var results = [];
    var form;
    var checkBoxGroup;
    var radioButtons;
    var lowestScore = 40;
    // -------------------------------     CREATING THE DOM ELEMENTS        ---------------------------------
    // $(".q-container").append(`<form role='form' class="form"><div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input class="mdl-textfield__input" type="text" id="name-div" name="name"><label class="mdl-textfield__label" for="name-div">Your Name...</label></div></form>`)
    $(".q-container").append(`<form role='form' class="form"><div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input class="mdl-textfield__input" type="text" id="name-div"><label class="mdl-textfield__label" for="name-div">Your Name...</label></div></form>`)

    for (var i = 0; i < questionsArray.length; i++) {
        var j = i + 1;
        var question = questionsArray[i];
        // console.log(question);
        checkBoxGroup = $(`<div class ="questions-div" id="q${j}-div"><div class="text-questions"><h6>Question ${j}:</h6>${question}</div></div><br>`);
        $(".form").append(checkBoxGroup)
        for (var k = 1; k < 6; k++) {
            radioButtons = $(`<div class="checkboxgroup"><label class="mdl-radio mdl-js-radio mdl-js-ripple-effect q${j}" for="q${j}-id${k}"><input type="radio" id="q${j}-id${k}" class="mdl-radio__button " name="q${j}" value="${k}"><span class="mdl-radio__label">${k}</span></label></div></div>`)
            checkBoxGroup.append(radioButtons);
            $(".form").append(checkBoxGroup);
        }
    };
    $(".form").append("<br><button class ='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect' id='submit-btn'> Submit </button>")
        // -------------------------------     CAPTURING THE FORM DATA ON SUBMIT        ---------------------------------

    $("form").on('submit', function(event) {
        event.preventDefault();
        // console.log(this)
        var formResults = [];
        formResults = $(this).serialize();
        var compatabilityArray = [];
        // lowestScore = 0;
        // console.log(formResults)
        // -------------------------------     PUSHING THE DATA TO THE API       ---------------------------------
        $.post("/api/new", formResults)
            .done(function(matchees) {
                // -------------------------------     CREATING AN ARRAY OF COMPATIBILITY SCORES       -------------------

                console.log(matchees)
                for (var i = 0; i < matchees.length; i++) {
                    compatabilityArray.push(matchees[i].matchCompatibilityScore)
                }
                // -------------------------------    FUNCTION THAT FINDS THE LOWEST SCORE      -----------------------------
                for (var j = 0; j < compatabilityArray.length; j++) {
                    var placeholder = compatabilityArray[j];
                    if (compatabilityArray[j] < lowestScore) {
                        lowestScore = compatabilityArray[j]
                    }
                }
                // -------------------------------    FINDS THE BEST MATCH     -----------------------------
                // We find the index of the lowest score of the compatability array, which is the same index as the matchees
                var match = matchees[compatabilityArray.indexOf(lowestScore)];
                console.log(match)
                    // $(".q-container").empty();

                if (match.matchCompatibilityScore === null || match == undefined) {
                    $(".result-container").empty();
                    $(".result-container").prepend("<h3>I'm sorry but there was an error with your submission. Please reload the page and try again.</h3>");
                    // alert("I'm sorry but there was an error with your submission. Please try again.")
                } else {
                    // var match;
                    $(".result-container").empty();
                    $(".header-div").hide();
                    $(".q-container").hide();
                    $(".result-container").show();

                    var resultsDiv = `<div class='match-result'><h3>Congratulations! <br>You are not alone in the world.</h3><h4>You've matched with ${match.name}!</h4><img src="${match.image}" class="match-image"></div>`;

                    $(".result-container").append(resultsDiv);
                }

                // alert("Getting your results...");
            });
    })
})
