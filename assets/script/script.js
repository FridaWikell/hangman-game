// Correct answers
let nintendoCharacters = [
    "toadstool",
    "toad",
    "link",
    "zelda"
]

// Global variabels
let answer = '';
let allowedMistakes = 7;
let mistakesDone = 0;
let guesses = [];
let letterOk = null;

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
    word = nintendoCharacters[Math.floor(math.random() * nintendoCharacters.length)];
}

// Check if users letter is in the correct word

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

// Check if game is won

// Check if game is lost

// Reset game

//Functions to run
createKeyboard();