//Create all the arrays to be used in the code
var guessCounter = 0;
var remainingGuesses = 10;
var lettersGuessed = [];
var wins = 0;
var losses = 0;
var wordsToGuess = ["lilac", "tulip", "azalea", "marigold", "amaryllis", "primrose", "zinnia", "magnolia", "hyacinth", "clover"];
    //total of 10 words!
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

//("press any key to begin");

function guessUpdate() {
  pickWord();
  //-------------------------------------------------------------------------
  //Picks a random word from the wordsToGuess array
  var word = wordsToGuess[parseInt(random)];
  hiddenWord = [];
  for (i = 0; i < word.length; i++) {
    hiddenWord[i] = "_";
  }
  console.log(word, hiddenWord);

  //-------------------------------------------------------------------------------
  //Prints the hiddenWord on the screen
  var hiddenWordDiv = document.createElement("div");
  hiddenWordDiv.id = "hidden-word";
  hiddenWordDiv.innerHTML = hiddenWord;
  document.getElementById("word-box").appendChild(hiddenWordDiv);
  removeCommas();
  //-----------------------------------------------------------------------------
  //Starts game when first key is pressed
  document.onkeyup = function(event) {
    userInput = event.key;

    //---------------------------------------------------------------------------
    //if-else statement making sure repeated guesses don't count against score
    if (lettersGuessed.includes(userInput)) {
      console.log(userInput + " already guessed");
    } else if (
      word.indexOf(userInput) == -1 &&
      letterList.includes(userInput)
    ) {
      lettersGuessed.push(userInput);
      document.getElementById("guessed-letters").innerHTML =
        "Letters guessed: " + lettersGuessed;
      console.log(lettersGuessed);

      remainingGuesses = remainingGuesses - 1;
      document.getElementById("guesses-remaining").innerHTML =
        "Remaining guesses: " + remainingGuesses;
      console.log("remaining guesses: ", remainingGuesses);

      //Nested if statement that tracks remaining guesses since the variable only updates within the parent if statement
      if (remainingGuesses == "0") {
        console.log("LOOZER");
        losses += 1;
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
        console.log("index of letter is: " + replace);
        hiddenWord.splice(replace, 1, userInput);
        hiddenWordDiv.innerHTML = hiddenWord;
        document.getElementById("word-box").appendChild(hiddenWordDiv);
        removeCommas();
      }
    }

    //-----------------------------------------------------------------------------
    //If user guesses all letters the win counter gets added to
    if (hiddenWord.includes("_")) {
      console.log("keep guessing!");
    } else {
      wins += 1;
      document.getElementById("showWins").innerHTML = "Wins: " + wins;
      console.log("you win!");
      alert("You win! You guessed " + word + "!" + " Nice job!!");
      newGame();
    }
  };
}

//Picks a random word from the wordsToGuess array
function pickWord() {
  random = Math.floor(Math.random() * wordsToGuess.length);
}

//For aesthetic reasons, removes commas between "_"
function removeCommas() {
  var lineDiv = document.getElementById("hidden-word");
  console.log(lineDiv);
  var lineDivText = document.getElementById("hidden-word").textContent;
  console.log(lineDivText);
  //use regular expressions here so we can use the 'g' tag to search for all instances of commas
  var newText = lineDivText.replace(/,/g, " ");
  console.log(newText);
  document.getElementById("hidden-word").textContent = newText;
}

//Refreshes game without losing score
function newGame() {
  guessCounter = 0;
  remainingGuesses = 10;
  document.getElementById("guesses-remaining").innerHTML = "Guesses remaining: 10";
  lettersGuessed = [];
  document.getElementById("guessed-letters").innerHTML =
    "Guesses remaining: 10";
  document.getElementById("word-box").innerHTML = "";
  document.getElementById("guessed-letters").innerHTML = "";
  guessUpdate();
}

guessUpdate();

//to add citations and references with next git push