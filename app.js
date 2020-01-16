/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
// GLOBAL VARIABLES
let scores, roundScore, activePlayer, gameRunning, topScore;

// START GAME
startGame();

// ROLL DICE EVENT LISTENER
document.querySelector(".btn-roll").addEventListener("click", function() {
  // We only want everything below to happen if gameRunning = true
  if (gameRunning) {
    // Get a random number
    let dice = Math.floor(Math.random() * 6) + 1;
    // Display the result
    let diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";

    // Update the round score if the rolled number was NOT 1
    if (dice !== 1) {
      // Add dice to round score
      roundScore += dice;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      // Move on to the next player
      nextPlayer();
    }
  }
});

// HOLD BUTTON EVENT LISTENER
document.querySelector(".btn-hold").addEventListener("click", function() {
  // We only want below to run if the gameRunning = true;
  if (gameRunning) {
    // Add player's current score to their global score
    scores[activePlayer] += roundScore;

    // Update the UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    // Grab the top score input
    let input = document.querySelector(".final-score").value;
    let winningScore;

    // Check to make sure there is an input.
    // If there isn't, winningScore defaults to 25.
    if (input) {
      winningScore = input;
    } else {
      winningScore = 25;
    }
    // Check if the player won the game
    if (scores[activePlayer] >= winningScore) {
      document.getElementById("name-" + activePlayer).textContent = "WINNER!";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gameRunning = false;
    } else {
      // Move to the next player
      nextPlayer();
    }
  }
});

// MOVE TO NEXT PLAYER FUNCTION
function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  // Change the UI to reset round score
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  // Toggle each player's active class on/off
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  // Hide the die for the next player
  document.querySelector(".dice").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", startGame);

// START GAME FUNCTION
function startGame() {
  scores = [0, 0];
  roundScore = 0;

  // Keeps track of the currently active player. Using a number instead of false
  // because we'll use the activePlayer variable to compare to our array of scores
  activePlayer = 0;
  gameRunning = true;
  // Set style
  document.querySelector(".dice").style.display = "none";

  // Reset scores, winning Score amount
  document.getElementById("score-0").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.querySelector(".final-score").value = "";
  // Reset player names, remove winner and active classes
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");

  // Give Player 1 the active class
  document.querySelector(".player-0-panel").classList.add("active");
}
