let scores = { red: 0, blue: 0 };
let timerInterval;
let time = 0;
let running = false;

function updateScore(color, change) {
  scores[color] += change;
  if (scores[color] < 0) scores[color] = 0;
  document.getElementById(`score-${color}`).textContent = scores[color];
}

function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

function updateDisplay() {
  const timerDisplay = document.getElementById("timer");
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  timerDisplay.textContent =
    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function toggleTimer() {
  const btn = document.getElementById("toggle-btn");
  if (!running) {
    if (time === 0) {
      const select = document.getElementById("time-select");
      time = parseInt(select.value);
    }
    timerInterval = setInterval(() => {
      if (time <= 0) {
        clearInterval(timerInterval);
        running = false;
        btn.textContent = "Start";
        return;
      }
      time--;
      updateDisplay();
    }, 1000);
    running = true;
    btn.textContent = "Stop";
  } else {
    clearInterval(timerInterval);
    running = false;
    btn.textContent = "Start";
  }
}

function resetAll() {
  clearInterval(timerInterval);
  running = false;
  time = parseInt(document.getElementById("time-select").value);
  updateDisplay();
  document.getElementById("toggle-btn").textContent = "Start";
  scores.red = 0;
  scores.blue = 0;
  document.getElementById("score-red").textContent = "0";
  document.getElementById("score-blue").textContent = "0";
document.querySelectorAll('.circle').forEach(c => c.classList.remove('active'));
}

document.getElementById("time-select").addEventListener("change", () => {
  if (!running) {
    time = parseInt(document.getElementById("time-select").value);
    updateDisplay();
  }
});


function toggleCircle(elem) {
  elem.classList.toggle("active");
}


function adjustTime(amount) {
  time = Math.max(0, time + amount); // nu mergem sub 0
  updateDisplay();
}


function updateDisplay() {
  const timerDisplay = document.getElementById("timer");
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  timerDisplay.textContent =
    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // doar fontul devine rosu
  if (time <= 30) {
    timerDisplay.classList.add("red");
  } else {
    timerDisplay.classList.remove("red");
  }
}
