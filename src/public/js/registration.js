// Add event listeners for form submission and back button
document.getElementById("registerUserForm").addEventListener("submit", handleRegisterButtonClick);
document.getElementById("backToLoginButton").addEventListener("click", () => window.location.href = '/login');

function handleRegisterButtonClick(event) {
  event.preventDefault();

  // Retrieve form values
  const inviteCode = document.getElementById("inviteCode").value;
  const username = document.getElementById("registerUsername").value;
  const password = document.getElementById("registerPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const email = document.getElementById("email").value;

  // Check if passwords match
  if (password !== confirmPassword) {
    alert("Passwords do not match. Please try again.");
    return;
  }

  // Construct user data for registration
  const userData = { inviteCode, username, password, firstname, lastname, email };

  // Post data to registration API
  fetch("/api/users/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Registration failed");
      }
      return response.json();
    })
    .then(() => {
      // Check if invite code was empty and redirect to /teamDetails
      if (inviteCode === "") {
        window.location.href = '/teamDetails';
        // get details_team from newly created team
      } else {
        document.getElementById("responseMessage").textContent = "Registration successful!";
        window.location.href = '/login';
      }
    })
    .catch(error => {
      document.getElementById("responseMessage").textContent = error.message;
    });
}