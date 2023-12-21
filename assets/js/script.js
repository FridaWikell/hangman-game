// Correct answers
let nintendoCharacters = [
    "toadstool",
    "toad",
    "link",
    "zelda",
    "luigi"
]

// Global variabels
let answer = '';
let allowedMistakes = 7;
let mistakesDone = 0;
let guesses = [];
let letterOk = null;
let word;

document.getElementById('allowed-mistakes').innerHTML = allowedMistakes;

/**
* Add keyboard to the page to let the user enter a letter. 
* Code from https://github.com/simonjsuh/Vanilla-Javascript-Hangman-Game/blob/master/js/hangman.js
*/
function createKeyboard() {
    let insideButtons = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
        `
        <button class = "basic-button button-logo first-button m-2"
        id = '` + letter + `'
        onClick="compareAnswer('` + letter + `')" >
        ` + letter + `
        </button>
        `
    ).join('');

    document.getElementById('keyboard').innerHTML = insideButtons;
}

/**
 * Select a random word
 */
function selectAWord() {
    word = nintendoCharacters[Math.floor(Math.random() * nintendoCharacters.length)];
}

// Check if users letter is in the correct word
// Gör om till ångt if
function compareAnswer(inputLetter) {
    guesses.indexOf(inputLetter) === -1 ? guesses.push(inputLetter) : null;
    document.getElementById(inputLetter).setAttribute('disabled', true);

    if (word.indexOf(inputLetter) >= 0) {
        inputWord();
        doWeHaveAWinner();
    } else if (word.indexOf(inputLetter) === -1) {
        mistakesDone++;
        hangmanUpdate();
        doWeHaveALoser();
    }
}

/**
 * Update hangman image whenever the user enters an incorrect letter
*/ 
function hangmanUpdate() {
    document.getElementById('hangman-image').src = '../assets/images/hangman' + mistakesDone + '.png';
}

// When a word is guessed
// När allt är klart. Kolla om detta går att skriva om till:
// letterOk = word.split('').map(letter
// function (guesses.indexOf(letter)
/// if (>= 0) {
//  letter
// } else {
//  "_"}
// ).join(');
function inputWord () {
    letterOk = word.split('').map(letter => (guesses.indexOf(letter) >= 0 ? letter : "_")).join('');
    document.getElementById('words-to-be-guessed').innerHTML = letterOk;
}

// When the user has made another mistake
function anotherMistake() {
    document.getElementById('mistakes').innerHTML = mistakesDone;
}

// Check if game is won
function doWeHaveAWinner() {
    if (letterOk === word) {
        document.getElementById('keyboard').innerHTML = 'You Won!!!';
    }
}

// Check if game is lost
function doWeHaveALoser() {
    if (mistakesDone === allowedMistakes) {
        document.getElementById('words-to-be-guessed') = 'The answer was: ' + word;
        document.getElementById('keyboard').innerHTML = 'You Lost!!!';
    }
}

// Reset game
function resetGame() {
    mistakesDone = 0;
    guesses = [];
    document.getElementById('hangman-image').src = 'assets/images/hangman.png';

    selectAWord();
    inputWord();
    anotherMistake();
    createKeyboard();
}

//Functions to run
createKeyboard();
selectAWord();
inputWord();