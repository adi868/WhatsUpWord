//citations at bottom of code

//INITIALIZE GAME
//-----------------------------
//Create all the arrays to be used in the code
var guessCounter = 0;
var remainingGuesses = 10;
var lettersGuessed = [];
var wins = 0;
var losses = 0;
var wordsToGuess = ["lilac", "tulip", "azalea", "marigold", "amaryllis", "primrose", "zinnia", "magnolia", "hyacinth", "clover"];
    //total of 10 words!
//letter list for checking user input values
var letterList = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z"
];
var random = "";
//stores the value of random

//Picks a random word from the wordsToGuess array
function pickWord() {
  random = Math.floor(Math.random() * wordsToGuess.length);
}

//calls random word and initializes with underscores for length of word
function guessUpdate() {
  pickWord();
  //Picks a random word from the wordsToGuess array
  var word = wordsToGuess[parseInt(random)];
//hiddenword equals the length of the chosen word from the computer (random)
  hiddenWord = [];
  for (i = 0; i < word.length; i++) {
    hiddenWord[i] = "_";
  }
  console.log(word, hiddenWord);

  
  //Prints the hiddenWord on the screen and calls removeCommas
  var hiddenWordDiv = document.createElement("div");
  hiddenWordDiv.id = "hidden-word";
  hiddenWordDiv.innerHTML = hiddenWord;
  document.getElementById("word-box").appendChild(hiddenWordDiv);
  removeCommas();


//----------------------
//PLAY GAME

  //Starts game when first key is pressed
  //this has to stay here and have to establish initialization of game first
  document.onkeyup = function(event) {
    userInput = event.key.toLowerCase();

    //if-else statement making sure repeated guesses don't count against score
    if (lettersGuessed.includes(userInput)) {
      console.log(userInput + " already guessed");
    } else if (
      word.indexOf(userInput) == -1 &&
      letterList.includes(userInput)
    ) {
      //pushes or adds user input to empty array of guessed letters
      lettersGuessed.push(userInput);
      document.getElementById("guessed-letters").innerHTML =
        "Letters guessed: " + lettersGuessed;
      console.log(lettersGuessed);

      remainingGuesses = remainingGuesses - 1;
      document.getElementById("guesses-remaining").innerHTML =
        "Remaining guesses: " + remainingGuesses;
      console.log("remaining guesses: ", remainingGuesses);

      //Nested if statement that tracks remaining guesses. New game if run out of guesses
      if (remainingGuesses == "0") {
        console.log("You lost!");
        losses ++;
        document.getElementById("showLosses").innerHTML = "Losses: " + losses;
        alert("Oh-no! The word was " + word + "!" + " Try again :)");
        newGame();
      }
    }

    //If user guesses correctly, shows letter on screen instead of "_" and adds it to the array of letters guessed
    for (i = 0; i < word.length; i++) {
      if (userInput == word[i]) {
        console.log("word[i] is: " + word[i]);
        replace = i;
        //i = index of array
        console.log("index of letter is: " + replace);
        //index of letter is..ex.5
        //replace the matching index on the array with the user input
        hiddenWord.splice(replace, 1, userInput);
        hiddenWordDiv.innerHTML = hiddenWord;
        removeCommas();
      }
  }
    //If user guesses all letters the win counter gets added +1 and game is reset
    //if word has not been completely guessed yet
    if (hiddenWord.includes("_")) {
      console.log("keep guessing!");
    } 
    //if word has been completely guessed, add win
    else {
      wins ++;
      document.getElementById("showWins").innerHTML = "Wins: " + wins;
      console.log("you win!");
      alert("You win! You guessed " + word + "!" + " Nice job!!");
      newGame();
    }
  };
}

//Removes commas between "_"
function removeCommas() {
  var lineDiv = document.getElementById("hidden-word");
  console.log(lineDiv);
  var lineDivText = document.getElementById("hidden-word").textContent;
  console.log(lineDivText);
  //search for instances of commas
  var newText = lineDivText.replace(/,/g, " ");
  console.log(newText);
  document.getElementById("hidden-word").textContent = newText;
}

//Refreshes game without losing score
function newGame() {
  guessCounter = 0;
  remainingGuesses = 10;
  //inner html allows modification of the DOM and fetches content w ID and replaces it 
  document.getElementById("guesses-remaining").innerHTML = "Guesses remaining: 10";
  lettersGuessed = [];
  document.getElementById("word-box").innerHTML = "";
  document.getElementById("guessed-letters").innerHTML = "";
  //updates word to guess
  guessUpdate();

}
//performs initial word to guess before loops on new game
guessUpdate();
