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
let mistakesAllowed = 7;
let mistakesMade = 0;
let guessesMade = [];
let letterOk = null;
let word;

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
    guessesMade.indexOf(inputLetter) === -1 ? guessesMade.push(inputLetter) : null;
    document.getElementById(inputLetter).setAttribute('disabled', true);

    if (word.indexOf(inputLetter) >= 0) {
        inputWord();
        doWeHaveAWinner();
    } else if (word.indexOf(inputLetter) === -1) {
        mistakesMade++;
        anotherMistake();
        hangmanUpdate();
        doWeHaveALoser();
    }
}

/**
 * Update hangman image whenever the user enters an incorrect letter
*/ 
// Help from https://stackoverflow.com/questions/11722400/programmatically-change-the-src-of-an-img-tag
function hangmanUpdate() {
    document.getElementById('hangman-image').src = 'assets/images/hangman' + mistakesMade + '.png';
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
    letterOk = word.split('').map(letter => (guessesMade.indexOf(letter) >= 0 ? letter : "_")).join('');
    document.getElementById('words-to-be-guessed').innerHTML = letterOk;
}

// When the user has made another mistake
function anotherMistake() {
    document.getElementById('mistakes-made').innerHTML = mistakesMade;
}

// Check if game is won
function doWeHaveAWinner() {
    if (letterOk === word) {
        document.getElementById('keyboard').innerHTML = 'You Won!!!';
    }
}

// Check if game is lost
function doWeHaveALoser() {
    if (mistakesMade === mistakesAllowed) {
        document.getElementById('words-to-be-guessed').innerHTML = 'The answer was: ' + word;
        document.getElementById('keyboard').innerHTML = 'You Lost!!!';
    }
}

// Reset game
function resetGame() {
    mistakesMade = 0;
    guessesMade = [];
    document.getElementById('hangman-image').src = 'assets/images/hangman0.png';

    selectAWord();
    inputWord();
    anotherMistake();
    createKeyboard();
}

document.getElementById('mistakes-allowed').innerHTML = mistakesAllowed;

//Functions to run
createKeyboard();
selectAWord();
inputWord();