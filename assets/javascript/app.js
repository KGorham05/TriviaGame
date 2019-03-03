// Computer selects and displays question at random
// Create 4 buttons
// if player clicks the correct answer
// show congratulations screen for a few seconds before displaying the next question
// if wrong 
// show selected answer, highlight correct answer
// if timer runs out diplay times up and highlight the correct answer
// on final screen, show number of correct and incorrect answers, and an option to restart the game without reloading the page



var timer;
var count = 10;
// This triviaGame object will hold all game logic (include all variables time permitting)

var triviaGame = {
    // Game Variables
    countdownTimer: 0,
    currentQuestionCounter: 0,
    numCorrect: 0,
    numIncorrect: 0,
    correctSolutionIndex: 0,
    questionArray: [{
        question: "What star is at the center of our universe?",
        choices: ["Nicolas Cage", "The Sun", "Earth", "Alpha Centauri"],
        correctAnswer: 1
    }, {
        question: "Which planet is known as the Morning Star or the Evening Star?",
        choices: ["Mars", "Jupiter", "Mercury", "Venus"],
        correctAnswer: 3
    }, {
        question: "How much time does it take for the sun's rays to reach earth?",
        choices: ["8 minutes", "8 days", "8 hours", "8 years"],
        correctAnswer: 0
    }, {
        question: "Which planet is nearest to the Earth?",
        choices: ["The Moon", "Mars", "Venus", "Jupiter"],
        correctAnswer: 2
    }, {
        question: "Which planet has the most moons?",
        choices: ["Jupiter", "Neptune", "Mars", "Saturn"],
        correctAnswer: 0
    }, {
        question: "What is an astronaut employed by the Russian Federal Space Agency called?",
        choices: ["an astronaut", "a spaceman", "a Kosmonavt", "yuhangyuan, or taikonauts"],
        correctAnswer: 2
    }],

    // Game function runs on click
    startGameScreen: function () {
        console.log("start game screen function");
        $("#start-div").empty();
        triviaGame.questionScreen();
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
        if (triviaGame.numCorrect + triviaGame.numIncorrect === 3) {
            triviaGame.gameOverScreen();
        } else {
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
        }


    },

    correctAnswerScreen: function () {

        triviaGame.clearAndReset();
        // display text that says "Correct!"
        $("#result-text").html("<h1>Correct!</h1>");
        // display numCorrect/numIncorrect on screen
        triviaGame.displayScore();
        setTimeout(triviaGame.questionScreen, 3000);
    },

    wrongAnswerScreen: function () {
        triviaGame.clearAndReset();
        // display text that says "Incorrect!"
        $("#result-text").html("<h1>Incorrect!</h1>");
        // display numCorrect/numIncorrect on screen
        triviaGame.displayScore(); 
        triviaGame.displayCorrectAnswer();
        setTimeout(triviaGame.questionScreen, 3000);
    },

    timeOutScreen: function () {
        triviaGame.clearAndReset();
        $("#result-text").html("<h1>Out of time!</h1>");
        triviaGame.displayCorrectAnswer();
        triviaGame.displayScore();
        setTimeout(triviaGame.questionScreen, 3000);
    },

    gameOverScreen: function () {
        $("#button-container").empty();
        $("#question-display").empty();
        $("#count-num").empty();
        clearInterval(timer);
        $("#result-text").html("<h1>Game Over! Your Final Score was: </h1>");
        triviaGame.displayScore();
        // create a button - 
        var startBtn = $("<button>");
        startBtn.attr("class", "btn btn-lg btn-primary");
        startBtn.attr("id", "restart-button");
        startBtn.text("Restart Game");
        $("#question-display").append(startBtn);
        // this on click event isn't working 
        $(document).on("click", "#restart-button", triviaGame.resetGame);
      
    },
    
    populateQandA: function () {
        // clear result screen
        $("#result-text").empty();
        $("#numCorrect").empty();
        $("#numIncorrect").empty();
        
        // generate question
        var displayQuestion = function () {
            console.log("displayQuestionFunction");
            $("#question-display").text(triviaGame.questionArray[triviaGame.currentQuestionCounter].question);
        };
        displayQuestion();
        // generate buttons with answer text
        for (var i = 0; i < 4; i++) {
            var btn = $("<button>");
            btn.attr("value", i);
            console.log("button value = " + btn.attr("value"));
            btn.text(triviaGame.questionArray[triviaGame.currentQuestionCounter].choices[i]);
            btn.addClass("btn btn-lg btn-primary btn-block");
            $("#button-container").append(btn);

        }
        // iterate through question array with a variable
        this.correctSolutionIndex = triviaGame.questionArray[triviaGame.currentQuestionCounter].correctAnswer;
        this.currentQuestionCounter++;
    },

    displayScore: function () {
        $("#numCorrect").html("<h1>Correct: " + triviaGame.numCorrect + "</h1>");
        $("#numIncorrect").html("<h1>Incorrect: " + triviaGame.numIncorrect + "</h1>");
    },

    clearAndReset: function () {
        $("#button-container").empty();
        $("#question-display").empty();
        $("#count-num").empty();
        clearInterval(timer);
        count = 7;
    },

    displayCorrectAnswer: function() {
        $("#result-text").append("The correct answer was "+ triviaGame.questionArray[triviaGame.currentQuestionCounter-1].choices[triviaGame.questionArray[triviaGame.currentQuestionCounter-1].correctAnswer]);
    },

    resetGame: function() {
        $("#question-display").empty();
        $("#result-text").empty();
        $("#numCorrect").empty();
        $("#numIncorrect").empty();
        $("#button-container").empty();
        triviaGame.countdownTimer = 0;
        triviaGame.currentQuestionCounter = 0;
        triviaGame.numCorrect = 0;
        triviaGame.numIncorrect = 0;
        triviaGame.correctSolutionIndex = 0;
        count = 10;
        clearInterval(timer);
        triviaGame.startGameScreen();
    },

};

// on click initiate questionScreen
$(document).on("click", "#start-button", triviaGame.startGameScreen);

