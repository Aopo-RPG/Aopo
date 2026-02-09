// 🔥 Firebase config (PUT YOUR OWN KEYS)
const firebaseConfig = {
  apiKey: "AIzaSyAlWy3aiA3g4vIN19tHQQvIYgeCr5KYsUQ",
  authDomain: "aopo-fbc72.firebaseapp.com",
  projectId: "aopo-fbc72",
  appId: "1:992208374808:web:15f44a66b05334d90d076d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

document.addEventListener("DOMContentLoaded", () => {

  const signinBtn = document.getElementById("signinBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const status = document.getElementById("status");

  signinBtn.addEventListener("click", () => {
    auth.signInAnonymously()
      .then(() => {
        status.innerText = "Signed in ✅";
        console.log("Signed in");
      })
      .catch(err => console.error(err));
  });

  logoutBtn.addEventListener("click", () => {
    auth.signOut().then(() => {
      status.innerText = "Logged out ❌";
      console.log("Logged out");
    });
  });

});

