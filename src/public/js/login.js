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

  fetch("/api/auth/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Login failed");
      }
      return response.json();
    })
    .then(() => {
      document.getElementById("responseMessage").textContent = "Login successful!";
      // Redirect to dashboard
      window.location.href = '/dashboard';
    })
    .catch((error) => {
      document.getElementById("responseMessage").textContent = error.message;
    });
}