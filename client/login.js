function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    // Simple frontend check
    if (!email.endsWith('@spsu.ac.in')) {
        showNotification('❌ Email must be a valid @spsu.ac.in address', 'error');
        return;
    }

    if (password.length < 6) {
        showNotification('❌ Password must be at least 6 characters', 'error');
        return;
    }

    // Success
    showNotification('✅ Login successful! Welcome 🎉');

    // Simulate login state
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);

    // Redirect to order page after delay
    setTimeout(() => {
        window.location.href = 'order.html';
    }, 1000);
}

// Notification display
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerText = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}
