
let time = 30;
let speed = 10;
let speedBar = 30;
let width = document.documentElement.clientWidth - speed;
let height = document.documentElement.clientHeight - speed;
let controls;
let player1;
let ia;
let bar1 = document.getElementById("bar1");
let bar2 = document.getElementById("bar2");
let ball = document.getElementById("ball");


let player1Score = 0;
let player2Score = 0;

const player1ScoreText = document.getElementById("player1ScoreText");

const player2ScoreText = document.getElementById("player2ScoreText");

document.getElementById("button").addEventListener('click', function () {
  start();
  this.remove();

});
function start() {

  init();
  controls = setInterval(play, time);
}
function init() {
  ball.style.left = 0;
  ball.state = 1;
  ball.direction = 1;
  player1 = new Object();
  ia = new Object();
  player1.keyPress = false;
  player1.keyCode = null;
  ia.keyPress = false;
  ia.keyCode = null;

}
function play() {
  moveBar();
  moveBall();
  lost();
}
function moveBar() {
  if (player1.keyPress) {
    if (player1.keyCode == 81 && bar1.offsetTop >= 0) {
      console.log(player1.keyCode);

      bar1.style.top = bar1.offsetTop - speedBar + "px";
    }
    if (player1.keyCode == 65 && (bar1.offsetTop + bar1.clientHeight) <= height) {
      console.log(player1.keyCode);

      bar1.style.top = bar1.offsetTop + speedBar + "px";
    }
  }
  if (ia.keyPress) {
    if (ia.keyCode == 79 && bar2.offsetTop >= 0) {

      bar2.style.top = bar2.offsetTop - speedBar + "px";
    }
    if (ia.keyCode == 76 && (bar2.offsetTop + bar2.clientHeight) <= height) {

      bar2.style.top = bar2.offsetTop + speedBar + "px";
    }
  }

}
function moveBall() {
  stateBall();
  switch (ball.state) {
    case 1:
      ball.style.left = ball.offsetLeft + speed + "px";
      ball.style.top = ball.offsetTop + speed + "px"
      break;
    case 2:
      ball.style.left = ball.offsetLeft + speed + "px";
      ball.style.top = ball.offsetTop - speed + "px"
      break;
    case 3:
      ball.style.left = ball.offsetLeft - speed + "px";
      ball.style.top = ball.offsetTop + speed + "px"
      break;
    case 4:
      ball.style.left = ball.offsetLeft - speed + "px";
      ball.style.top = ball.offsetTop - speed + "px"
      break;
  }
}
function stateBall() {
  if (colliderPlayer2()) {
    ball.direction = 2;
    if (ball.state == 1) {
      ball.state = 3;
    }
    if (ball.state == 2) {
      ball.state = 4;
    }

  } else if (colliderPlayer1()) {
    ball.direction = 1;
    if (ball.state == 3) {
      ball.state = 1;
    }
    if (ball.state == 4) {
      ball.state = 2;
    }
  }
  if (ball.direction === 1) {
    if (ball.offsetTop >= height) ball.state = 2;
    else if (ball.offsetTop <= 0) ball.state = 1;
  } else {
    if (ball.offsetTop >= height) ball.state = 4;
    else if (ball.offsetTop <= 0) ball.state = 3;
  }
}
function colliderPlayer1() {
  if (ball.offsetLeft <= (bar1.clientWidth) &&
    ball.offsetTop >= bar1.offsetTop
    && ball.offsetTop <= (bar1.offsetTop + bar1.clientHeight)) {
    return true;
  }
  return false;
}
function colliderPlayer2() {
  if (ball.offsetLeft >= (width - bar2.clientWidth) &&
    ball.offsetTop >= bar2.offsetTop
    && ball.offsetTop <= (bar2.offsetTop + bar2.clientHeight)) {
    return true;
  }
  return false;
}
function lost() {
  if (player1Score == 5 || player2Score == 5) {
    clearInterval(controls);
    document.body.style.background = "red";
  }
  if (ball.offsetLeft >= width) {
    if (player1Score > 5 || player2Score > 5) {
      clearInterval(controls);
      document.body.style.background = "red";
    }


    stop();
    console.log("player1 socre");
    player1Score = player1Score + 1;
    player1ScoreText.innerText = "Player 1: " + player1Score;
  }
  if (ball.offsetLeft <= 0) {



    stop();
    console.log("player2 socre");
    player2Score = player2Score + 1;
    player2ScoreText.innerText = "Player 2: " + player2Score;

  }
}
document.onkeydown = function (e) {
  e = e || window.event;
  switch (e.keyCode) {
    case 81: //Q
    case 65: //A
      player1.keyCode = e.keyCode;
      player1.keyPress = true;
      break;
    case 79:
    case 76:
      ia.keyCode = e.keyCode;
      ia.keyPress = true;
      break;
  }
}
document.onkeyup = function (e) {
  if (e.keyCode == 81 || e.keyCode == 65) {
    player1.keyPress = false;
  }
  if (e.keyCode == 79 || e.keyCode == 76) {
    ia.keyPress = false;
  }
}
function stop() {

  ball.style.top = "0px";
  ball.style.left = "1px";

  ball.state = 1;
  ball.direction = 1;

}


