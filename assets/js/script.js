// Correct answers
let nintendoCharacters = [
    "toadstool", 
    "toad", 
    "link", 
    "zelda", 
    "luigi",
    "mario",
    "pit",
    "peach",
    "bowser",
    "ganon",
    "palutena"
];

// Global variabels
let answer = "";
let mistakesAllowed = 7;
let mistakesMade = 0;
let guessesMade = [];
let letterOk = null;
let word;

document.getElementById("restart-button").addEventListener("click", resetGame);

/**
 * Add keyboard to the page to let the user enter a letter.
 * Code from https://github.com/simonjsuh/Vanilla-Javascript-Hangman-Game/blob/master/js/hangman.js
 */
function createKeyboard() {
  let insideButtons = "abcdefghijklmnopqrstuvwxyz"
    .split("")
    .map(
      (letter) =>
        `
        <button class = "basic-button" "keyboard-button"
        id = '` +
        letter +
        `'
        onClick="compareAnswer('` +
        letter +
        `')" >
        ` +
        letter +
        `
        </button>
        `
    )
    .join("");

  document.getElementById("keyboard").innerHTML = insideButtons;
}

/**
 * Select a random word
 */
function selectAWord() {
  word = nintendoCharacters[Math.floor(Math.random() * nintendoCharacters.length)];
}

// Om indexof https://www.freecodecamp.org/news/how-to-check-if-a-string-contains-a-substring-javascript/
/**
 * Compare if the input exist in the correct answer
 */
function compareAnswer(inputLetter) {
  // Disable the pressed letter
  document.getElementById(inputLetter).setAttribute("disabled", true);

  if (guessesMade.indexOf(inputLetter) === -1) {
    guessesMade.push(inputLetter);
  }

  //If input letter is in the correct answer
  if (word.indexOf(inputLetter) >= 0) {
    inputWord();
    doWeHaveAWinner();
  } else {
    mistakesMade++;
    anotherMistake();
    document.getElementById("hangman-image").src =
      "assets/images/hangman" + mistakesMade + ".png";
    doWeHaveALoser();
  }
}

// Help from https://stackoverflow.com/questions/74006820/how-to-split-a-word-in-a-string-and-replace-letters-with-different-characters-in
/**
 * Update the correct guessed letteres
 */
function inputWord() {
  letterOk = word
    .split("")
    .map((letter) => (guessesMade.indexOf(letter) >= 0 ? letter : "_"))
    .join("");
  document.getElementById("words-to-be-guessed").innerHTML = letterOk;
}

/**
 * Updates how many mistakes the user has made
 */
function anotherMistake() {
  document.getElementById("mistakes-made").innerHTML = mistakesMade;
}

/**
 * Check if the game is won
 */
function doWeHaveAWinner() {
  if (letterOk === word) {
    document.getElementById("chalkboard").style.background =
      "url(assets/images/mario.webp) no-repeat right center/cover";
    document.getElementById("hangman-image").style.display = "none";
    document.getElementById("words-section").style.display = "none";
    document.getElementById("mario-text").style.display = "flex";
  }
}

/**
 * Check if the game is lost
 */
function doWeHaveALoser() {
  if (mistakesMade === mistakesAllowed) {
    document.getElementById("chalkboard").style.background = "url(assets/images/yoshi.webp) no-repeat left center/cover";
    document.getElementById("hangman-image").style.display = "none";
    document.getElementById("words-section").style.display = "none";
    document.getElementById("yoshi-text").style.display = "flex";
    document.getElementById("word").innerHTML = word.toUpperCase();
  }
}

/**
 * Restarts the game
 */
function resetGame() {
    mistakesMade = 0;
    guessesMade = [];
    document.getElementById("hangman-image").src = "assets/images/hangman0.png";
    document.getElementById("hangman-image").style.display = "flex";
    document.getElementById("words-section").style.display = "flex";
    document.getElementById("yoshi-text").style.display = "none";
    document.getElementById("mario-text").style.display = "none";
    document.getElementById("chalkboard").style.background = "url(assets/images/chalkboard.webp) no-repeat center center/cover";

  selectAWord();
  inputWord();
  anotherMistake();
  createKeyboard();
}

document.getElementById("mistakes-allowed").innerHTML = mistakesAllowed;

//Functions to run at start
createKeyboard();
selectAWord();
inputWord();
