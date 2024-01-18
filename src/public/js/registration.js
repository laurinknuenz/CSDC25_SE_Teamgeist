document
  .getElementById("loginUserForm")
  .addEventListener("submit", handleRegisterButtonClick);

document
.getElementById("backToLoginButton")
.addEventListener("click", function() {
  // Logic to go back to the login page
});


function handleRegisterButtonClick(event) {
  event.preventDefault();
  const inviteCode = document.querySelector('input[name="inviteCode"]').value;
  const username = document.querySelector('input[name="username"]').value;
  const password = document.querySelector('input[name="password"]').value;
  const confirmPassword = document.querySelector('input[name="confirmPassword"]').value;

  if(password == confirmPassword) {
    fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inviteCode, username, password, confirmPassword }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Registration failed");
        }
        return response.json();
      })
      .then((data) => {
        document.getElementById("successMessage").textContent =
          "Registration successful!";
        // Redirect to login or dashboard page if needed
      })
      .catch((error) => {
        document.getElementById("errorMessage").textContent = error.message;
      });
  } else{
    alert("Passwords do not match. Please try again.");
  }
  
}
