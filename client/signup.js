document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const msgDiv = document.getElementById('msg');

  // Clear previous messages
  msgDiv.textContent = '';
  msgDiv.className = 'notification';

  try {
    const res = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, phone, email, password })
    });

    const data = await res.json();
    if (res.ok) {
      msgDiv.innerText = '✅ Signup successful!';
      msgDiv.classList.add('success');
      // Optional: redirect after signup
      setTimeout(() => window.location.href = 'login.html', 1500);
    } else {
      msgDiv.innerText = `❌ ${data.message}`;
      msgDiv.classList.add('error');
    }
  } catch (err) {
    msgDiv.innerText = '❌ Error signing up';
    msgDiv.classList.add('error');
    console.error(err);
  }
});
