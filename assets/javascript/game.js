// Array of words for bands I like pool
var bands = ["streetlightmanifesto", "bigdandthekidstable", "ledzepplin", "pinkfloyd", "metallica", "madcaddies", "ghost", "dropkickmurphys", "floggingmolly", "reelbigfish", "nofx"];
var userGuess;
var randBand = "";
var bandToGuess = [];
var incorrect = [];
var underscore = [];
var totalGuesses = 9;
// Number of guesses left
var totalwins = 0;
//regex for keyboard alphabet only. 
var alphaExp = /^[a-zA-Z]+$/;
var space = /^\s+$/;

// Get domcument Id's
var displayUnderscores = document.getElementById("underscores");
var displayIncorrect = document.getElementById("incorrectArray");
var displayWins = document.getElementById("wins");

// Initialize game
setNewGame();

// Function to create new game
function setNewGame(){
    incorrect = [];
    underscore = [];
    totalGuesses = 9;
    // Choose one of those words randomly
    randBand = bands[Math.floor(Math.random() * bands.length)]
    randBand.toLowerCase();
    bandToGuess = randBand.split("");
    console.log(randBand);
    generateUnderscore();
    appendScoreArray();
    appendIncorrectArray();
}

// Create underscores based on word lenght
function generateUnderscore() {
    for (let i = 0; i < randBand.length; i++) {
        underscore.push("_");
    }
    // checkGuess(space);
    return;
}

// Watch user input
document.onkeyup = function (event) {
    let userInput = event.key;

    if (!userInput.match(alphaExp)) {
       window.alert("Thats not a letter dumb, dumb.");
       return;
    }
    if (checkDuplicates(userInput)) {
        return;
    }

    checkGuess(userInput);
    console.log(underscore)
};

function checkDuplicates(userInput) {
    let checkIncorrect = incorrect.includes(userInput);
    let checkUnderscore = underscore.includes(userInput);
    if (checkIncorrect || checkUnderscore) {
        window.alert("You've already guessed the letter, try again.");
        return true;
    }
}

// Check if guess is right or wrong function
function checkGuess(userInput) {
    console.log(userInput);
    // Need to figure out how to make this work and automatically add spaces insted of white space. currently breaks code.
    // if (userInput === " ") {
    //     for (let l = 0; l < bandToGuess.length; l++) {
    //         // set letter variable
    //         let letter = bandToGuess[l];
    //         if (letter === userInput) {
    //             setCorrect(userInput, l);
    //         }
    //     }
    //     return;
    // }
    let check = bandToGuess.includes(userInput);
    if (checkDuplicates()) {
        return;
    }
    if (check) {
        for (let l = 0; l < bandToGuess.length; l++) {
            // set letter variable
            let letter = bandToGuess[l];
            if (letter === userInput) {
                setCorrect(userInput, l);
            }
        }
        return;
    }
    // Setting wrong guesses
    setIncorrect(userInput);

    checkGameOver();

}

// Function to set correect input
function setCorrect(userInput, counter) {    
    underscore.splice(counter, 1, userInput);
    appendScoreArray();
    setTimeout(function(){
        checkIfWin();
    }, 100);
}

// Set incorrect Array  Subtract remaining guesses
function setIncorrect(userInput) {
    incorrect.push(userInput);
    totalGuesses--;
    appendIncorrectArray();
    console.log(totalGuesses);
}

// Clear function to restart game
// Function to check if number of guesses is <= 0
function checkGameOver() {
    if (totalGuesses <= 0) {
        window.alert("You lose!", location.reload());
    }
}

// Compare underscore array to the randBand to see if the game is won
function checkIfWin(){
    var winString = underscore.join("");
    if(winString == randBand){
        totalwins++;
        appendWins();
        setNewGame();
    } 
}

// Appednd filled underscore array to dom
function appendScoreArray(){
    displayUnderscores.innerHTML = "";
    for (var i = 0; i < underscore.length; i++) {
        var x = document.createElement('span');
        x.innerHTML = underscore[i];
        displayUnderscores.appendChild(x);
    };    
}

// Appednd filled incorrect array to dom
function appendIncorrectArray(){
    displayIncorrect.innerHTML = "";
    for (var i = 0; i < incorrect.length; i++) {
        var x = document.createElement('span');
        x.innerHTML = incorrect[i];
        displayIncorrect.appendChild(x);
    };    
}

// Append wins to dom
function appendWins(){
    displayWins.innerHTML = "";
    var x = document.createElement('span');
    x.innerHTML = totalwins;
    displayWins.appendChild(x);
}
 
