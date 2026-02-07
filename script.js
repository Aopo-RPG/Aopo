const loginBtn = document.getElementById("loginBtn");
const statusText = document.getElementById("status");

loginBtn.addEventListener("click", () => {
  auth.signInAnonymously()
    .then(() => {
      statusText.innerText = "✅ Online mode ready!";
      console.log("User logged in anonymously");
    })
    .catch((error) => {
      console.error(error);
      statusText.innerText = "❌ Error connecting";
    });
});
