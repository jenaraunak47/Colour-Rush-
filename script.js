const colors = ["red", "blue", "green", "purple"];

const wordElement = document.getElementById("word");
const timeElement = document.getElementById("time");
const scoreElement = document.getElementById("score");
const bestElement = document.getElementById("best");
const messageElement = document.getElementById("message");
const startButton = document.getElementById("start");
const answerButtons = document.querySelectorAll("[data-color]");

let score = 0;
let timeLeft = 30;
let correctColor = "";
let timer = null;
let playing = false;

let bestScore = Number(localStorage.getItem("colorRushBest")) || 0;
bestElement.textContent = bestScore;

function randomColor() {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}

function newRound() {
  const word = randomColor();
  correctColor = randomColor();

  wordElement.textContent = word.toUpperCase();
  wordElement.style.color = correctColor;
}

function updateScore() {
  scoreElement.textContent = score;
}

function endGame() {
  playing = false;
  clearInterval(timer);

  answerButtons.forEach(button => {
    button.disabled = true;
  });

  startButton.textContent = "Play Again";
  messageElement.textContent = `Time's up! Final score: ${score}`;
}

function startGame() {
  clearInterval(timer);

  score = 0;
  timeLeft = 30;
  playing = true;

  updateScore();
  timeElement.textContent = timeLeft;
  messageElement.textContent = "Choose the font color!";
  startButton.textContent = "Restart Game";

  answerButtons.forEach(button => {
    button.disabled = false;
  });

  newRound();

  timer = setInterval(() => {
    timeLeft--;
    timeElement.textContent = timeLeft;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

answerButtons.forEach(button => {
  button.addEventListener("click", () => {
    if (!playing) return;

    const selectedColor = button.dataset.color;

    if (selectedColor === correctColor) {
      score++;
      messageElement.textContent = "Correct! +1 🎉";

      if (score > bestScore) {
        bestScore = score;
        bestElement.textContent = bestScore;

        localStorage.setItem("colorRushBest", bestScore);
      }
    } else {
      messageElement.textContent = "Oops! Try the next one.";
    }

    updateScore();
    newRound();
  });
});

startButton.addEventListener("click", startGame);
