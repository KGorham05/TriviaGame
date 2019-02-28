// Computer selects and displays question at random
// Create 4 buttons
// if player clicks the correct answer
// show congratulations screen for a few seconds before displaying the next question
// if wrong 
// show selected answer, highlight correct answer
// if timer runs out diplay times up and highlight the correct answer
// on final screen, show number of correct and incorrect answers, and an option to restart the game without reloading the page

var questionArray = [{
    question: "What is 2 x 2?",
    choices: [2, 4, 8, "Threeve"],
    correctAnswer: 1
}];

var count = 3
// This triviaGame object will hold all game variables + logic

var triviaGame = {
    // Game Variables
    countdownTimer: 0,



    // Game functions
    startGameScreen: function () {
        console.log("startGameScreen func running");
        // clear start button 
        $("#start-div").remove();
        // call countDown function
        triviaGame.countDownFunc();

    },
    countDownFunc: function () {
        console.log("countDownFunc running");
        // create a timer counting down from 3 to 0 
        var timer = setInterval(triviaGame.decrement, 1000);
        // display timer
        $("#count-num").html("<h1>" + count + "</h1>");
        // call questionScreen function at 0 
        if (count <= 0) {
            console.log("made it to count === 0");
            clearInterval(timer);
            triviaGame.questionScreen();
        };

    },
    // function for timer decreasing
    decrement: function () {
        console.log("made it into decrement function");
        count--;
        $("#count-num").html("<h1>" + count + "</h1>")
    },

    questionScreen: function () {
        console.log("We made it to the question screen!");
        populateAnswerButtons();
    },

    // correctAnswerScreen: function() {

    // },

    // wrongAnswerScreen: function() {

    // },

    // timeOutScreen: function() {

    // },

    populateAnswerButtons: function () {
        for (var i = 0; i < 4; i++) {
            var btn = $("<button>");
            btn.val(indexOf(questionArray.choices[i]));
            btn.text(questionArray.choices[i]);
            btn.addClass("btn btn-lg btn-primary");
            $("#button-container").append(btn);
        }
    },








};
// sets up initial game screen
// $("#start-button").on("click", triviaGame.startGameScreen);

// on click initiate questionScreen
$(document).on("click", "#start-button", triviaGame.startGameScreen);