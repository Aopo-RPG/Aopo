// 🔥 Firebase config (PUT YOUR OWN KEYS)
const firebaseConfig = {
  apiKey: "PUT_API_KEY_HERE",
  authDomain: "PUT_AUTH_DOMAIN",
  projectId: "PUT_PROJECT_ID",
  appId: "PUT_APP_ID"
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
