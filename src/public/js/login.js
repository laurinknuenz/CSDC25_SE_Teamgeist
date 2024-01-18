document
  .getElementById("backToRegisterButton")
  .addEventListener("click", handleRegisterButtonClick);

  function handleRegisterButtonClick(event) {
    event.preventDefault();
    // Redirect to register
    window.location.href = '/register';
  }