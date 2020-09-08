const score = document.querySelector(".score"),
  start = document.querySelector(".start"),
  gameArea = document.querySelector(".gameArea"),
  car = document.createElement("div"),
  keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false,
  }

car.classList.add("car")
start.addEventListener("click", () => {
  start.classList.add("hide")
  setting.start = true
  gameArea.appendChild(car)
  requestAnimationFrame(playGame)
})

const setting = {
  start: false,
  score: 0,
  speed: 3,
}

function playGame() {
  if (setting.start) {
    requestAnimationFrame(playGame)
  }
}

function startRun(event) {
  if (event.key !== "F5" && event.key !== "F12") {
    event.preventDefault()
    keys[event.key] = true
  }
}

function stopRun(event) {
  event.preventDefault()
  keys[event.key] = false
}
document.addEventListener("keydown", startRun)
document.addEventListener("keyup", stopRun)
