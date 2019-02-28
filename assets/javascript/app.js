// Computer selects and displays question at random
// Create 4 buttons
// if player clicks the correct answer
// show congratulations screen for a few seconds before displaying the next question
// if wrong 
// show selected answer, highlight correct answer
// if timer runs out diplay times up and highlight the correct answer
// on final screen, show number of correct and incorrect answers, and an option to restart the game without reloading the page



var timer;
var count = 7
// This triviaGame object will hold all game logic (include all variables time permitting)

var triviaGame = {
    // Game Variables
    countdownTimer: 0,
    currentQuestionCounter: 0,
    numCorrect: 0,
    numIncorrect: 0,

    // Game function runs on click
    startGameScreen: function () {
        // clear start button -- could use help with a different method here
        $("#start-div").empty();
        $("#count-num").html("<h1>Time Remaining: " + count + "</h1>")
        // call countDown function
        // triviaGame.countDownFunc(); adding this functionailty to the questionScreen function
        triviaGame.questionScreen();
        // make buttons work -
    // check if clicked button text is = correct answer 
        // if so show result screen: Correct
        // update correct/incorrect 
    // else if clicked button text !== correct answer 
        // show result screen: Incorrect!
        // update correct/incorrect
        $("button").on("click", function() {
            if 

        })
       


    },
    countDownFunc: function () {
        console.log("countDownFunc running");
        // create a timer counting down from 3 to 0 -- removing this for the time being
        timer = setInterval(triviaGame.decrement, 1000);
        // call questionScreen function at 0 
        // triviaGame.questionScreen();

    },
    // function for timer decreasing
    decrement: function () {
        console.log("made it into decrement function");
        count--;
        $("#count-num").html("<h1>Time Remaining: " + count + "</h1>");
        if (count <= 0) {
            console.log("made it to count === 0");
            clearInterval(timer);
            // run a function to move to result screen with "out of time! displayed"
            triviaGame.timeOutScreen();
            // increcement incorrect answer variable 
            triviaGame.numIncorrect++;

            // triviaGame.questionScreen(); moved this to line 31 but it's not working properly
        };
    },

    questionScreen: function () {
        console.log("We made it to the question screen!");
        // start count down
        timer = setInterval(triviaGame.decrement, 1000);
        // generate Q and A's
        triviaGame.populateQandA();
    },

    // correctAnswerScreen: function() {

    // },

    // wrongAnswerScreen: function() {

    // },

    timeOutScreen: function () {
        console.log("out of time!")
    },

    // resetScreen: function() {

    // }
    // 
    populateQandA: function () {
        var questionArray = [{
            question: "What is 2 x 2?",
            choices: [2, 4, 8, "Threeve"],
            correctAnswer: 1
        }, {
            question: "What is 2 - 2?",
            choices: [2, 4, 0, "Threeve"],
            correctAnswer: 2
        }];
        // generate question
        var displayQuestion = function () {
            console.log("displayQuestionFunction");
            $("#question-display").text(questionArray[triviaGame.currentQuestionCounter].question);
        };
        displayQuestion();
        // generate buttons with answer text
        for (var i = 0; i < 4; i++) {
            var btn = $("<button>");
            btn.text(questionArray[triviaGame.currentQuestionCounter].choices[i]);
            btn.addClass("btn btn-lg btn-primary");
            $("#button-container").append(btn);

        }
        // iterate through question array with a variable
        this.currentQuestionCounter++;
    },

};

// on click initiate questionScreen
$(document).on("click", "#start-button", triviaGame.startGameScreen);

