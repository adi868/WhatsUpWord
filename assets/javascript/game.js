//initializing all the variables for the game
var listOfWords = ["lilac", "tulip", "azalea", "marigold", "amaryllis", "primrose", "zinnia", "magnolia", "hyacinth", "clover"];
var computerRandIndex = math.floor(math.random() * listOfWords.length);
var computerPickWord = listOfWords[computerRandIndex];
var numberofGuessCount = 6;
var wins = 0;
var losses = 0;
var wrongGuessLetter = "";
var rightGuessLetter = "";
var boardGame = [];
for(var i= 0; i<computerPickWord; i++) {
    boardGame[i] = "_";
}
var userInput = "";

function resetGame() {

}

// play the game
document.onkeyup = function(event){
    userInput = event.key.toLowerCase();

}

displayBoardDiv.textContent = boardGame.join(" ");

if(computerPickWord.indexOf(userInput)> -1) {
    boardGame[computerPickWord.indexOf(userInput)] = userInput;
}