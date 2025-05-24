const select = document.getElementById("numarArbitri");
const flagsContainer = document.getElementById("flags");
const blueButtons = document.getElementById("blue-buttons");
const redButtons = document.getElementById("red-buttons");

select.addEventListener("change", updateUI);
updateUI();

function updateUI() {
  const count = parseInt(select.value);
  flagsContainer.innerHTML = "";
  blueButtons.innerHTML = "";
  redButtons.innerHTML = "";

  for (let i = 0; i < count; i++) {
    const pole = document.createElement("div");
    pole.className = "flagpole";

    const flag = document.createElement("div");
    flag.className = "flag";
    flag.dataset.index = i;

    pole.appendChild(flag);
    flagsContainer.appendChild(pole);
  }

  for (let i = 1; i <= count; i++) {
    const blueBtn = document.createElement("button");
    blueBtn.textContent = i;
    blueBtn.addEventListener("click", () => vote("blue", i, count));
    blueButtons.appendChild(blueBtn);

    const redBtn = document.createElement("button");
    redBtn.textContent = i;
    redBtn.addEventListener("click", () => vote("red", i, count));
    redButtons.appendChild(redBtn);
  }
}

function vote(color, score, total) {
  const flags = document.querySelectorAll(".flag");

  flags.forEach((flag, index) => {
    if (color === "blue") {
      flag.style.background = index < score
        ? `linear-gradient(90deg, #007bff 0%, ${shadeColor("#007bff", 20)} 100%)`
        : `linear-gradient(90deg, #ff4d4d 0%, ${shadeColor("#ff4d4d", 20)} 100%)`;
    } else {
      flag.style.background = index < total - score
        ? `linear-gradient(90deg, #007bff 0%, ${shadeColor("#007bff", 20)} 100%)`
        : `linear-gradient(90deg, #ff4d4d 0%, ${shadeColor("#ff4d4d", 20)} 100%)`;
    }
  });
}


// Helper pentru umbre
function shadeColor(color, percent) {
  const f = parseInt(color.slice(1), 16),
    t = percent < 0 ? 0 : 255,
    p = Math.abs(percent) / 100,
    R = f >> 16,
    G = f >> 8 & 0x00FF,
    B = f & 0x0000FF;
  return "#" + (
    0x1000000 +
    (Math.round((t - R) * p) + R) * 0x10000 +
    (Math.round((t - G) * p) + G) * 0x100 +
    (Math.round((t - B) * p) + B)
  ).toString(16).slice(1);
}



  document.getElementById("reset-button").addEventListener("click", () => {
  updateUI(); // reinitializeaza steagurile si butoanele
});


function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}
