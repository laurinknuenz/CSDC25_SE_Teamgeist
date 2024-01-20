document
  .getElementById("registerUserForm")
  .addEventListener("submit", handleRegisterButtonClick);

document
  .getElementById("backToLoginButton")
  .addEventListener("click", handleLoginButtonClick);

function handleLoginButtonClick(event) {
  event.preventDefault();
  window.location.href = '/login';
}

function handleRegisterButtonClick(event) {
  event.preventDefault();
  const inviteCode = document.querySelector('input[name="inviteCode"]').value;
  const username = document.querySelector('input[name="username"]').value;
  const password = document.querySelector('input[name="password"]').value;
  const confirmPassword = document.querySelector('input[name="confirmPassword"]').value;

  if (password == confirmPassword) {
    fetch("/api/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inviteCode, username, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Registration failed");
        }
        return response.json();
      })
      .then((data) => {
        document.getElementById("responseMessage").textContent = "Registration successful!";
        // Redirect to dashboard 
        window.location.href = '/dashboard';
      })
      .catch((error) => {
        document.getElementById("responseMessage").textContent = error.message;
      });
  } else {
    alert("Passwords do not match. Please try again.");
  }
}