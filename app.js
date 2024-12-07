const choices = document.querySelectorAll(".choice");
const playerScoreEl = document.getElementById("player-score");
const computerScoreEl = document.getElementById("computer-score");
const messageEl = document.getElementById("message");
const nextRoundBtn = document.getElementById("next-round");
const restartBtn = document.getElementById("restart");

let playerScore = 0;
let computerScore = 0;

function getComputerChoice() {
  const options = ["pierre", "feuille", "ciseaux"];
  return options[Math.floor(Math.random() * options.length)];
}

function getWinner(player, computer) {
  if (player === computer) return "égalité";
  if (
    (player === "pierre" && computer === "ciseaux") ||
    (player === "feuille" && computer === "pierre") ||
    (player === "ciseaux" && computer === "feuille")
  ) {
    return "joueur";
  }
  return "ordinateur";
}

function playGame(event) {
  const playerChoice = event.target.dataset.choice;
  const computerChoice = getComputerChoice();
  const winner = getWinner(playerChoice, computerChoice);

  if (winner === "joueur") {
    playerScore++;
    messageEl.textContent = `Vous gagnez ! ${playerChoice} bat ${computerChoice}.`;
  } else if (winner === "ordinateur") {
    computerScore++;
    messageEl.textContent = `Vous perdez ! ${computerChoice} bat ${playerChoice}.`;
  } else {
    messageEl.textContent = `Égalité ! Vous avez tous choisi ${playerChoice}.`;
  }

  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;

  choices.forEach(choice => (choice.disabled = true));
  nextRoundBtn.classList.remove("hidden");
}

function nextRound() {
  choices.forEach(choice => (choice.disabled = false));
  messageEl.textContent = "À vous de jouer !";
  nextRoundBtn.classList.add("hidden");
}

function restartGame() {
  playerScore = 0;
  computerScore = 0;
  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
  nextRound();
}

choices.forEach(choice => {
  choice.addEventListener("click", playGame);
});

nextRoundBtn.addEventListener("click", nextRound);
restartBtn.addEventListener("click", restartGame);
