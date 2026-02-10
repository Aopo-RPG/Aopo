// 🔥 Firebase config (PUT YOUR KEYS)
const firebaseConfig = {
 apiKey: "AIzaSyAlWy3aiA3g4vIN19tHQQvIYgeCr5KYsUQ",
  authDomain: "aopo-fbc72.firebaseapp.com",
  projectId: "aopo-fbc72.firebaseapp.com",
  appId: "1:992208374808:web:15f44a66b05334d90d076d"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

let xp = 0;
let level = 1;

const signinBtn = document.getElementById("signinBtn");
const logoutBtn = document.getElementById("logoutBtn");
const statusText = document.getElementById("status");
const gameArea = document.getElementById("gameArea");
const levelUpBox = document.getElementById("levelUp");

// AUTH
signinBtn.onclick = () => auth.signInAnonymously();
logoutBtn.onclick = () => auth.signOut();

auth.onAuthStateChanged(user => {
  if (user) {
    statusText.innerText = "Signed in ✅";
    signinBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";
    gameArea.style.display = "grid";
  } else {
    statusText.innerText = "Not signed in ❌";
    signinBtn.style.display = "inline-block";
    logoutBtn.style.display = "none";
    gameArea.style.display = "none";
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
}

// LEVEL POPUP (5 sec)
function showLevelUp() {
  levelUpBox.style.display = "block";
  setTimeout(() => {
    levelUpBox.style.display = "none";
  }, 5000);
}

// 🎯 Reaction Game
function reactionGame() {
  let start = Date.now();
  setTimeout(() => {
    let time = Date.now() - start;
    document.getElementById("reactionResult").innerText =
      "Reaction time: " + time + " ms";
    gainXP(3);
  }, Math.random() * 2000 + 500);
}

// 🧠 Memory Game
function memoryGame() {
  let num = Math.floor(Math.random() * 9) + 1;
  alert("Remember: " + num);
  let guess = prompt("What number?");
  if (guess == num) {
    document.getElementById("memoryResult").innerText = "Correct!";
    gainXP(4);
  } else {
    document.getElementById("memoryResult").innerText = "Wrong!";
  }
}

// 🎲 Dice Game
function diceGame() {
  let roll = Math.floor(Math.random() * 6) + 1;
  document.getElementById("diceResult").innerText =
    "You rolled: " + roll;
  gainXP(2);
}
