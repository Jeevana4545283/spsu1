// --- LOGIN HANDLER ---
function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    if (!email.endsWith('@spsu.ac.in')) {
        showNotification('❌ Email must be a valid @spsu.ac.in address', 'error');
        return;
    }

    if (password.length < 6) {
        showNotification('❌ Password must be at least 6 characters', 'error');
        return;
    }

    showNotification('✅ Login successful! Welcome 🎉');
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);

    setTimeout(() => {
        window.location.href = 'order.html';
    }, 1000);
}

// --- SHOW NOTIFICATION ---
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerText = message;

    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// --- SWITCH BETWEEN PAGES (SPA STYLE) ---
function showPage(pageId) {
    const pages = document.querySelectorAll('.main-content');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    const targetPage = document.getElementById(pageId + 'Page');
    if (targetPage) {
        targetPage.classList.add('active');
    } else {
        console.warn(`Page with ID ${pageId + 'Page'} not found.`);
    }
}

// --- CART BADGE COUNT ---
function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const badge = document.getElementById('cartBadge');
    if (badge) {
        badge.textContent = cart.length;
    }
}

// --- ADD TO CART FUNCTION ---
function addToCart(id, name, price) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ id, name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    showNotification(`✅ ${name} added to cart`);
}

// --- CONTACT FORM HANDLER ---
function handleContact(event) {
    event.preventDefault();

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const subject = document.getElementById('contactSubject').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    if (!name || !email || !subject || !message) {
        showNotification('❌ Please fill out all fields.', 'error');
        return;
    }

    showNotification(`✅ Thank you ${name}! We'll get back to you soon 📧`);
    event.target.reset();
}

// --- ON PAGE LOAD ---
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
});
