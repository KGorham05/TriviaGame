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
    correctSolutionIndex: 0,

    // Game function runs on click
    startGameScreen: function () {
        // clear start button -- could use help with a different method here
        $("#start-div").empty();
        triviaGame.questionScreen();
        // $("button").on("click", function () { 
        //     console.log($(this).attr("value"));
        //     if (parseInt($(this).attr("value")) === triviaGame.correctSolutionIndex) {
        //         triviaGame.numCorrect++;
        //         triviaGame.correctAnswerScreen();
        //     } else {
        //         triviaGame.numIncorrect++;
        //         triviaGame.wrongAnswerScreen();
        //     }
        // });
    },
    // function for timer decreasing
    decrement: function () {
        count--;
        $("#count-num").html("<h2>Time Remaining: " + count + "</h2>");
        if (count <= 0) {
            console.log("made it to count === 0");
            clearInterval(timer);
            triviaGame.numIncorrect++;
            triviaGame.timeOutScreen();
        };
    },

    questionScreen: function () {
        // start count down
        $("#count-num").html("<h2>Time Remaining: " + count + "</h2>")
        timer = setInterval(triviaGame.decrement, 1000);
        // generate Q and A's
        triviaGame.populateQandA();
        $("button").on("click", function () { 
            console.log($(this).attr("value"));
            if (parseInt($(this).attr("value")) === triviaGame.correctSolutionIndex) {
                triviaGame.numCorrect++;
                triviaGame.correctAnswerScreen();
            } else {
                triviaGame.numIncorrect++;
                triviaGame.wrongAnswerScreen();
            }
        });
    },

    correctAnswerScreen: function () {
        // remove question, answers, and timer from the screen
        $("#button-container").empty();
        $("#question-display").empty();
        $("#count-num").empty();
        clearInterval(timer);
        count = 7;
        // display text that says "Correct!"
        $("#result-text").html("<h1>Correct!</h1>");
        // display numCorrect/numIncorrect on screen
        $("#numCorrect").html("<h1>" + triviaGame.numCorrect + "</h1>");
        $("#numIncorrect").html("<h1>" + triviaGame.numIncorrect + "</h1>");
        setTimeout(triviaGame.questionScreen, 4000);
    },

    wrongAnswerScreen: function () {
        // remove question, answers, and timer from the screen
        $("#button-container").empty();
        $("#question-display").empty();
        $("#count-num").empty();
        clearInterval(timer);
        count = 7;
        // display text that says "Incorrect!"
        $("#result-text").html("<h1>Incorrect!</h1>");
        // display numCorrect/numIncorrect on screen
        $("#numCorrect").html("<h1>" + triviaGame.numCorrect + "</h1>");
        $("#numIncorrect").html("<h1>" + triviaGame.numIncorrect + "</h1>");
        setTimeout(triviaGame.questionScreen, 4000);
    },

    timeOutScreen: function () {
        // remove question, answers, and timer from the screen
        $("#button-container").empty();
        $("#question-display").empty();
        $("#count-num").empty();
        clearInterval(timer);
        count = 7;
        // display text that says "Out of time!"
        $("#result-text").html("<h1>Out of time!</h1>");
        // display numCorrect/numIncorrect on screen
        $("#numCorrect").html("<h1>" + triviaGame.numCorrect + "</h1>");
        $("#numIncorrect").html("<h1>" + triviaGame.numIncorrect + "</h1>");
        setTimeout(triviaGame.questionScreen, 4000);
    },

    // gameOverScreen: function() {

    // }
    // 
    populateQandA: function () {
        // clear result screen
        $("#result-text").empty();
        $("#numCorrect").empty();
        $("#numIncorrect").empty();
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
            btn.attr("value", i);
            console.log("button value = " + btn.attr("value"));
            btn.text(questionArray[triviaGame.currentQuestionCounter].choices[i]);
            btn.addClass("btn btn-lg btn-primary");
            $("#button-container").append(btn);

        }
        // iterate through question array with a variable
        this.correctSolutionIndex = questionArray[triviaGame.currentQuestionCounter].correctAnswer;
        this.currentQuestionCounter++;

        console.log("Index of Current Question Solution = " + questionArray[triviaGame.currentQuestionCounter - 1].correctAnswer);
    },

};

// on click initiate questionScreen
$(document).on("click", "#start-button", triviaGame.startGameScreen);

