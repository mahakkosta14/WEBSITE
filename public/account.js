document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const message = await response.text();
    alert(message);
    if (response.ok) {
        // Redirect to the home page or user dashboard
        window.location.href = '/index.html';
    }
});

document.getElementById('register-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    const response = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    });

    const result = await response.json();
    alert(`User registered with ID: ${result.id}`);
});

document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    // const result = await response.json();
    // if (response.ok) {
    //     // Store user ID in local storage
    //     localStorage.setItem('user_id', result.user_id);
    //     // Redirect to the home page or user dashboard
    //     window.location.href = '/index.html';
    // } else {
    //     alert(result.message);
    // }
});

document.getElementById('register-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    const response = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    });

    const result = await response.json();
    alert(`User registered with ID: ${result.id}`);
});
