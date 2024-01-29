let gameSeq = [];
let userSeq = [];
let btns = ["red", "yellow", "green", "purple"];

let started = false;
let level = 0;

let maxScore = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", () => {
  if (started == false) {
    console.log("game started");
    started = true;
    levelUp();
  }
});

function buttononClick() {
  if (started == false) {
    console.log("game started");
    started = true;
    levelUp();
  }
}

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(() => {
    btn.classList.remove("userflash");
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;
  let rndIndx = Math.floor(Math.random() * 4);
  let rndColor = btns[rndIndx];
  let rndBtn = document.querySelector(`.${rndColor}`);
  gameSeq.push(rndColor);
  console.log(gameSeq);
  gameFlash(rndBtn);
}

function checkAns(idx) {
  if (gameSeq[idx] == userSeq[idx]) {
    if (gameSeq.length == userSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game over. your level is ${level}. Press any key/tap to start`;
    document.querySelector("body").classList.add("bodyred");
    setTimeout(() => {
      document.querySelector("body").classList.remove("bodyred");
    }, 150);
    reset();
  }
}

function reset() {
  started = false;
  level = 0;
  gameSeq = [];
  userSeq = [];
}

function btnPress() {
  let btn = this;
  userFlash(btn);
  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");

for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

setInterval(() => {
  if (maxScore < level) {
    maxScore = level;
    document.querySelector("h3").innerHTML = `Max Score: ${maxScore}`;
  }
}, 100);
