document
  .getElementById("backToRegisterButton")
  .addEventListener("click", handleRegisterButtonClick);

document
  .getElementById("loginUserForm")
  .addEventListener("submit", handleLoginButtonClick);

function handleRegisterButtonClick(event) {
  event.preventDefault();

  // Redirect to register
  window.location.href = '/register';
}

function handleLoginButtonClick(event) {
  event.preventDefault();
  const username = document.querySelector('input[name="username"]').value;
  const password = document.querySelector('input[name="password"]').value;

  const data = {
    username: username,
    password: password,
  };

  fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.success) {
        // Authentication was successful, redirect the user to the dashboard or another page
        window.location.href = "/dashboard";
      } else {
        // Authentication failed, display an error message
        document.getElementById("errorMessage").textContent = "Login failed. Please check your credentials.";
      }
    })
    .catch((error) => {
      document.getElementById("responseMessage").textContent = error.message;
      console.error("Error during login:", error);
    });
}