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
    "palutena",
    "goomba",
    "lakitu",
    "boo",
    "koopa",
    "medusa",
    "simon",
    "mikey",
    "popo",
    "nana",
    "yoshi",
    "birdo",
    "wart"
];

// Global variabels
let playerName = "";
const mistakesAllowed = 7;
let mistakesMade = 0;
let guessesMade = [];
let letterOk = null;
let word;

// Event listeners
document.getElementById("let-play-button").addEventListener("click", (e) => {
    e.preventDefault();
    closeModal();
    createKeyboard();
});
document.getElementById("restart-button").addEventListener("click", resetGame);

// To prevent iOS to zoom in when filling out the form 
// Code based (but modified) from https://stackoverflow.com/questions/2989263/disable-auto-zoom-in-input-text-tag-safari-on-iphone?fbclid=IwAR3UfflQITCKkjmRbtn2xl1mIS_GD2rFXVDwi1-XyEMqwkJwviW0fjgQOOk

let nameField = document.getElementById("name");

// Set font-size to 16px to prevent zoom 
nameField.addEventListener("mousedown", function(event) {
    event.target.style.fontSize = "16px";
});

// Change font-size back to its initial value so the design will not break
nameField.addEventListener("focus", function(event) {
    event.target.style.fontSize = "";
});

/**
 * Close start menu modal
 */
function closeModal() {
    var letters = /^[A-Za-z]+$/;
    
    playerName = document.getElementById("name").value;
    if (playerName.match(letters) && playerName.length >= 3) {
        document.getElementById("modal-container").style.display = "none";
    }
    else {
        alert('Please enter a name with at least three characters (a-z) and without blank space');
    }
}

// Parts of the code to create the keyboard are based (but modified) from https://github.com/simonjsuh/Vanilla-Javascript-Hangman-Game/blob/master/js/hangman.js
/**
 * Add keyboard to the page to let the user enter a letter.
 */
function createKeyboard() {
  let insideButtons = "abcdefghijklmnopqrstuvwxyz"
    .split("")
    .map(
      (letter) =>
        `
        <button class="basic-button keyboard-button"
        id = '` + letter + `' >
        ` + letter + `
        </button>
        `
    )
    .join("");

  document.getElementById("keyboard").innerHTML = insideButtons;
  document.querySelectorAll(".keyboard-button").forEach((element) => element.addEventListener("click", function () { compareAnswer(this.id);}));
}

/**
 * Select a random word
 */
function selectAWord() {
  word = nintendoCharacters[Math.floor(Math.random() * nintendoCharacters.length)];
}

/**
 * Compare if the input exist in the correct answer
 */
function compareAnswer(inputLetter) {
  // Disable the pressed letter
  document.getElementById(inputLetter).setAttribute("disabled", true);

  if (guessesMade.indexOf(inputLetter) === -1) {
    guessesMade.push(inputLetter);
  }

  // If input letter is in the correct answer
  if (word.indexOf(inputLetter) >= 0) {
    inputWord();
    doWeHaveAWinner();
  } else {
    mistakesMade++;
    anotherMistake();
    updateHangmanImage();
    doWeHaveALoser();
  }
}

/**
 * Update the correct guessed letters
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
 * Updates Hangman image
 */
function updateHangmanImage() {
    document.getElementById("hangman-image").src = "assets/images/hangman" + mistakesMade + ".png";
}

/**
 * Check if the game is won
 */
function doWeHaveAWinner() {
  if (letterOk === word) {
    document.getElementById("chalkboard").style.background = "url(assets/images/mario.webp) no-repeat right center/cover";
    document.getElementById("hangman-image").style.display = "none";
    document.getElementById("words-section").style.display = "none";
    document.getElementById("user-name-win").innerHTML = playerName.charAt(0).toUpperCase() + playerName.slice(1);
    document.getElementById("mario-text").style.display = "flex";
    document.getElementById("keyboard").style.display = "none";
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
    document.getElementById("user-name").innerHTML = playerName.charAt(0).toUpperCase() + playerName.slice(1);
    document.getElementById("word").innerHTML = word.toUpperCase();
    document.getElementById("keyboard").style.display = "none";
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
    document.getElementById("keyboard").style.display = "flex";

  selectAWord();
  inputWord();
  anotherMistake();
  createKeyboard();
}

document.getElementById("mistakes-allowed").innerHTML = mistakesAllowed;

//Functions to run at start
selectAWord();
inputWord();