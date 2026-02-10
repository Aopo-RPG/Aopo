// 🔥 Firebase config (PUT YOUR OWN REAL KEYS)
const firebaseConfig = {
  apiKey: "AIzaSyAlWy3aiA3g4vIN19tHQQvIYgeCr5KYsUQ",
  authDomain: "aopo-fbc72.firebaseapp.com",
  projectId: "aopo-fbc72.firebaseapp.com",
  appId: "1:992208374808:web:15f44a66b05334d90d076d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Get elements AFTER page loads
window.onload = () => {
  const signinBtn = document.getElementById("signinBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const status = document.getElementById("status");

  // --- SIGN IN ---
  signinBtn.addEventListener("click", () => {
    auth.signInAnonymously()
      .catch(error => {
        console.error(error);
        alert("Sign-in failed");
      });
  });

  // --- LOG OUT ---
  logoutBtn.addEventListener("click", () => {
    auth.signOut();
  });

  // --- REAL AUTH STATE LISTENER ---
  auth.onAuthStateChanged(user => {
    if (user) {
      status.innerText = "Signed in ✅";
      signinBtn.style.display = "none";
      logoutBtn.style.display = "inline-block";
    } else {
      status.innerText = "Not signed in ❌";
      signinBtn.style.display = "inline-block";
      logoutBtn.style.display = "none";
    }
  });
};
