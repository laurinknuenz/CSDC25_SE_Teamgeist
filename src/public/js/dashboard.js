document.getElementById('burgerMenuButton').addEventListener('click', function () {
    var menuContent = document.getElementById('burgerMenuContent');
    menuContent.style.display = menuContent.style.display === 'block' ? 'none' : 'block';
});

document.getElementById('logoutLink').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default link behavior

    fetch('/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(response => {
            if (response.ok) {
                window.location.href = '/login'; // Redirect to the login page after logout
            }
        })
        .catch(error => console.error('Error:', error));
});

fetch('/api/users/', {
    method: 'GET'
})
    .then(response => response.json())
    .then(data => {
        if (data.user) {
            document.getElementById('userGreeting').textContent = `Hallo ${data.user.firstname}, deine Aktivitäten`;
        }
    })
    .catch(error => console.error('Error:', error));