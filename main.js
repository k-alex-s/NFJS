/** @format */

const score = document.querySelector('.score'),
  start = document.querySelector('.start'),
  gameArea = document.querySelector('.gameArea'),
  car = document.createElement('div'),
  keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false,
  };

car.classList.add('car');
start.addEventListener('click', () => {
  start.classList.add('hide');
  for (let i = 0; i < getQtyElements(100); i++) {
    const line = document.createElement('div');
    line.classList.add('line');
    line.style.top = i * 100 + 'px';
    line.y = i * 100;
    gameArea.appendChild(line);
  }
  for (let i = 0; i < getQtyElements(100 * setting.traffic); i++) {
    const enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.y = -100 * setting.traffic * (i + 1);
    enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
    enemy.style.top = enemy.y + 'px';
    enemy.style.background = 'transparent url(./image/enemy' + Math.floor(Math.random() * 4) + '.png) center / cover no-repeat';
    gameArea.appendChild(enemy);
  }
  setting.start = true;
  gameArea.appendChild(car);
  setting.x = car.offsetLeft;
  setting.y = car.offsetTop;
  requestAnimationFrame(playGame);
});

const setting = {
  start: false,
  score: 0,
  speed: 3,
  traffic: 3,
};

function getQtyElements(h) {
  return document.documentElement.clientHeight / h + 1;
}

function playGame() {
  if (setting.start) {
    moveRoad();
    moveEnemy();
    if (keys.ArrowLeft && setting.x > 0) {
      setting.x -= setting.speed;
    }
    if (keys.ArrowRight && setting.x < gameArea.offsetWidth - car.offsetWidth) {
      setting.x += setting.speed;
    }
    if (keys.ArrowDown && setting.y < gameArea.offsetHeight - car.offsetHeight) {
      setting.y += setting.speed;
    }
    if (keys.ArrowUp && setting.y > 0) {
      setting.y -= setting.speed;
    }
    car.style.left = setting.x + 'px';
    car.style.top = setting.y + 'px';
    requestAnimationFrame(playGame);
  }
}

function startRun(event) {
  if (keys.hasOwnProperty(event.key)) {
    event.preventDefault();

    keys[event.key] = true;
  }
}

function stopRun(event) {
  if (keys.hasOwnProperty(event.key)) {
    event.preventDefault();

    keys[event.key] = false;
  }
}
function moveRoad() {
  let lines = document.querySelectorAll('.line');
  lines.forEach(function (line) {
    line.y += setting.speed * 2;
    line.style.top = line.y + 'px';
    if (line.y >= document.documentElement.clientHeight) {
      line.y = -100;
    }
  });
}

function moveEnemy() {
  let enemies = document.querySelectorAll('.enemy');
  enemies.forEach(function (i) {
    i.y += setting.speed;
    i.style.top = i.y + 'px';
    if (i.y >= document.documentElement.clientHeight) {
      i.y = -100 * setting.traffic;
      i.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
      i.style.background = 'transparent url(./image/enemy' + Math.floor(Math.random() * 4) + '.png) center / cover no-repeat';
    }
  });
}
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);
