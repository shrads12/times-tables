const shuffledArray = shuffleArray();
let currentIndex = 0;
let score = 0;
let timeout;
const numberLeftEl = document.querySelector(".numberLeft");
const numberRightEl = document.querySelector(".numberRight");
const correctAnswerEl = document.querySelector(".correct-answer");
const timeoutEl = document.querySelector(".timeout");
const answerEl = document.querySelector(".answer");
const tableEl = document.querySelector("#table");
const startButtonEl = document.querySelector(".start-button");

tableEl.addEventListener("change", (event) => {
  numberRightEl.innerHTML = event.target.value;
});

startButtonEl.addEventListener("click", () => {
  if (!tableEl.value?.length) {
    return;
  }
  start();
});

const nextButtonEl = document.querySelector(".next-button");
nextButtonEl.addEventListener("click", () => {
  timeoutEl.style.display = "none";
  answerEl.removeAttribute("disabled");
  next();
});

document.querySelector(".answer").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    checkAnswer();
  }
});

const tryAgainButtonEl = document.querySelector(".try-again-button");
tryAgainButtonEl.addEventListener("click", () => {
  reset();
  start();
});

function startTimer() {
  timeout = setTimeout(() => {
    checkAnswer();
  }, 10000);
}

function start() {
  document.querySelector(".start").style.display = "none";
  showQuestion();
}

function showQuestion() {
  document.querySelector(".timeout").style.display = "none";
  startTimer();
  document.querySelector(".question").style.display = "flex";
  document.querySelector(".answer").focus();
  const numberLeft = shuffledArray[currentIndex];
  numberLeftEl.innerHTML = numberLeft;
}

function shuffleArray() {
  return _.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  // return _.shuffle([1, 2, 3, 4, 5]);
}

function reset() {
  document.querySelector(".fail").style.display = "none";
  currentIndex = 0;
  score = 0;
  shuffleArray();
}

function showScore() {
  if (score === shuffledArray.length) {
    document.querySelector(
      ".score-pass"
    ).innerHTML = `${score}/${shuffledArray.length}`;
    document.querySelector(".pass").style.display = "flex";
  } else {
    document.querySelector(
      ".score-fail"
    ).innerHTML = `${score}/${shuffledArray.length}`;
    document.querySelector(".fail").style.display = "flex";
  }
}

function isDone() {
  return currentIndex >= shuffledArray.length;
}

function isCorrect(answer, left, right) {
  return (
    answer.trim() !== "" &&
    parseInt(answer) === parseInt(left) * parseInt(right)
  );
}

function checkAnswer() {
  clearTimeout(timeout);
  const answer = answerEl.value;
  const answerIsCorrect = isCorrect(
    answer,
    numberLeftEl.textContent,
    numberRightEl.textContent
  );

  if (answerIsCorrect) {
    score += 1;
    next();
  } else {
    correctAnswerEl.innerHTML = `Correct Answer: ${
      parseFloat(numberLeftEl.textContent) *
      parseFloat(numberRightEl.textContent)
    }`;
    answerEl.setAttribute("disabled", "true");
    timeoutEl.style.display = "flex";
  }
}

function next() {
  currentIndex += 1;
  answerEl.value = "";
  if (isDone()) {
    document.querySelector(".question").style.display = "none";
    showScore();
  } else {
    showQuestion();
  }
}
