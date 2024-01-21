// Add event listeners for the login form and back to register button
document.getElementById("loginUserForm").addEventListener("submit", handleLoginButtonClick);
document.getElementById("backToRegisterButton").addEventListener("click", handleRegisterButtonClick);

function handleLoginButtonClick(event) {
  event.preventDefault();

  // Retrieve login form values
  const username = document.querySelector('input[name="username"]').value;
  const password = document.querySelector('input[name="password"]').value;

  // Prepare data for login request
  const loginData = { username, password };

  // Post login data to authentication API
  fetch("/auth/login/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginData),
  })
  .then(result => {
    console.log(result);
    if (result.status == 200) {
      // Authentication was successful, redirect to dashboard
      console.log("Login success");
      window.location.href = "/dashboard";
    } else {
      // Authentication failed, display an error message
      document.getElementById("responseMessage").textContent = "Login failed. Please check your credentials.";
    }
  })
  .catch(error => {
    document.getElementById("responseMessage").textContent = error.message;
    console.error("Error during login:", error);
  });
}

function handleRegisterButtonClick(event) {
  event.preventDefault();
  // Redirect to the register page
  window.location.href = '/register';
}