let xp = 0;
let level = 1;
let user = null;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// LOGIN
function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
}

function emailLogin() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.signInWithEmailAndPassword(email, password)
    .catch(() => auth.createUserWithEmailAndPassword(email, password));
}

auth.onAuthStateChanged(u => {
  if (u) {
    user = u;
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("hub").style.display = "block";
    document.getElementById("userName").innerText = u.email || u.displayName;
    loadStats();
    loadChat();
  }
});

// XP SYSTEM
function gainXP(amount) {
  xp += amount;
  if (xp >= 10) {
    xp = 0;
    level++;
    showLevelUp();
  }
  updateStats();
  saveStats();
}

function updateStats() {
  document.getElementById("xp").innerText = xp;
  document.getElementById("level").innerText = level;
}

// LEVEL UP EFFECT
function showLevelUp() {
  const banner = document.getElementById("levelUpBanner");
  banner.style.display = "block";
  setTimeout(() => banner.style.display = "none", 5000);
}

// SAVE / LOAD
function saveStats() {
  db.ref("players/" + user.uid).set({ xp, level });
}

function loadStats() {
  db.ref("players/" + user.uid).once("value", snap => {
    if (snap.exists()) {
      xp = snap.val().xp;
      level = snap.val().level;
      updateStats();
    }
  });
}

// CHAT
function sendChat() {
  const msg = document.getElementById("chatInput").value;
  db.ref("chat").push({
    user: user.email || user.displayName,
    text: msg
  });
  document.getElementById("chatInput").value = "";
}

function loadChat() {
  db.ref("chat").limitToLast(50).on("child_added", snap => {
    const data = snap.val();
    const box = document.getElementById("chatBox");
    box.innerHTML += `<div><b>${data.user}:</b> ${data.text}</div>`;
    box.scrollTop = box.scrollHeight;
  });
}

//
// 🎮 GAMES
//

// SNAKE
let snake = [{x:200,y:200}];
let dx = 20, dy = 0;

function startSnake() {
  document.addEventListener("keydown", e => {
    if (e.key === "ArrowUp") {dx=0;dy=-20;}
    if (e.key === "ArrowDown") {dx=0;dy=20;}
    if (e.key === "ArrowLeft") {dx=-20;dy=0;}
    if (e.key === "ArrowRight") {dx=20;dy=0;}
  });

  setInterval(() => {
    ctx.clearRect(0,0,400,400);
    let head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    snake.pop();
    ctx.fillStyle = "lime";
    snake.forEach(p => ctx.fillRect(p.x, p.y, 20, 20));
  }, 150);

  gainXP(3);
}

// MEMORY
function startMemory() {
  const num = Math.floor(Math.random() * 9) + 1;
  alert("Remember: " + num);
  const guess = prompt("What number?");
  if (guess == num) {
    gainXP(5);
    alert("Correct!");
  } else {
    alert("Wrong!");
  }
}

// AIM TRAINER
function startAim() {
  canvas.onclick = e => {
    const x = Math.random() * 350;
    const y = Math.random() * 350;
    ctx.clearRect(0,0,400,400);
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(x,y,15,0,Math.PI*2);
    ctx.fill();
    gainXP(1);
  };
}

// LUCKY WHEEL
function spinWheel() {
  const reward = Math.floor(Math.random() * 5) + 1;
  alert("You won " + reward + " XP!");
  gainXP(reward);
}

// TYPING
function startTyping() {
  const word = "aopo";
  const guess = prompt("Type: " + word);
  if (guess === word) {
    gainXP(5);
    alert("Perfect!");
  } else {
    alert("Try again!");
  }
}
