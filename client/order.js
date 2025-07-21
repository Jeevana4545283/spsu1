const menuItems = {
    food: [
        { id: 1, name: "Paneer Butter Masala", price: 120, rating: 4.5, emoji: "🍛", location: "Main Canteen" },
        { id: 2, name: "Chicken Biryani", price: 150, rating: 4.7, emoji: "🍗", location: "Food Court" },
        { id: 3, name: "Veg Thali", price: 80, rating: 4.2, emoji: "🍽️", location: "Main Canteen" },
        { id: 4, name: "Masala Dosa", price: 60, rating: 4.4, emoji: "🥞", location: "South Indian Corner" },
        { id: 5, name: "Chole Bhature", price: 90, rating: 4.3, emoji: "🫓", location: "Punjabi Dhaba" },
        { id: 6, name: "Pasta Arrabiata", price: 110, rating: 4.1, emoji: "🍝", location: "Italian Corner" }
    ],
    snacks: [
        { id: 7, name: "Samosa (2 pcs)", price: 20, rating: 4.6, emoji: "🥟", location: "Snack Counter" },
        { id: 8, name: "Sandwich", price: 40, rating: 4.3, emoji: "🥪", location: "Quick Bites" },
        { id: 9, name: "Pav Bhaji", price: 70, rating: 4.5, emoji: "🍞", location: "Street Food Corner" },
        { id: 10, name: "Maggi Noodles", price: 35, rating: 4.2, emoji: "🍜", location: "Quick Bites" },
        { id: 11, name: "French Fries", price: 50, rating: 4.0, emoji: "🍟", location: "Snack Counter" },
        { id: 12, name: "Popcorn", price: 25, rating: 4.1, emoji: "🍿", location: "Movie Corner" }
    ],
    grocery: [
        { id: 13, name: "Notebook (200 pages)", price: 45, rating: 4.4, emoji: "📓", location: "Stationery Shop" },
        { id: 14, name: "Pen Set (5 pcs)", price: 30, rating: 4.2, emoji: "✒️", location: "Stationery Shop" },
        { id: 15, name: "Toothbrush", price: 25, rating: 4.3, emoji: "🪥", location: "General Store" },
        { id: 16, name: "Soap Bar", price: 35, rating: 4.1, emoji: "🧼", location: "General Store" },
        { id: 17, name: "Instant Noodles Pack", price: 60, rating: 4.0, emoji: "🍜", location: "General Store" },
        { id: 18, name: "Biscuits Pack", price: 40, rating: 4.2, emoji: "🍪", location: "General Store" }
    ],
    beverages: [
        { id: 19, name: "Masala Chai", price: 15, rating: 4.7, emoji: "☕", location: "Tea Stall" },
        { id: 20, name: "Fresh Lime Water", price: 25, rating: 4.4, emoji: "🍋", location: "Juice Corner" },
        { id: 21, name: "Cold Coffee", price: 45, rating: 4.5, emoji: "🥤", location: "Cafe" },
        { id: 22, name: "Lassi", price: 35, rating: 4.3, emoji: "🥛", location: "Dairy Corner" },
        { id: 23, name: "Soft Drink", price: 30, rating: 3.9, emoji: "🥤", location: "General Store" },
        { id: 24, name: "Energy Drink", price: 50, rating: 4.0, emoji: "⚡", location: "Sports Store" }
    ]
};

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentCategory = 'food';

// Load items into grid
function loadItems(category) {
    currentCategory = category;
    const grid = document.getElementById('itemsGrid');
    const items = menuItems[category] || [];

    grid.innerHTML = items.map(item => `
        <div class="item-card">
            <div class="item-image">${item.emoji}</div>
            <div class="item-details">
                <div class="item-name">${item.name}</div>
                <div class="item-price">₹${item.price}</div>
                <div class="item-rating">⭐ ${item.rating} • <span style="color:#666">${item.location}</span></div>
                <button class="add-to-cart" onclick="addToCart(${item.id}, '${category}')">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// Category filter handler
function filterItems(category, element) {
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
    element.classList.add('active');
    loadItems(category);
}

// Add item to cart
function addToCart(itemId, category) {
    const selectedItem = menuItems[category].find(item => item.id === itemId);
    if (!selectedItem) return;

    const cartItem = cart.find(item => item.id === itemId);
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...selectedItem, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    showToast(`${selectedItem.name} added to cart`);
    updateCartUI();
}

// Show toast message
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.style.display = 'block';
    toast.style.animation = 'none';
    toast.offsetHeight;
    toast.style.animation = null;

    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}

// Update cart panel UI
function updateCartUI() {
    const cartBadge = document.getElementById('cartBadge');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const totalAmount = document.getElementById('totalAmount');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalItems;

    if (cart.length === 0) {
        cartItems.innerHTML = `<p style="text-align:center;color:#666;padding:2rem;">Your cart is empty</p>`;
        cartTotal.style.display = 'none';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>
                <strong>${item.name}</strong><br>
                ₹${item.price} × ${item.quantity}
            </div>
            <div style="display:flex;align-items:center;gap:10px;">
                <button onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalAmount.textContent = total;
    cartTotal.style.display = 'block';
}

// Change quantity of item
function updateQuantity(itemId, change) {
    const item = cart.find(i => i.id === itemId);
    if (!item) return;

    item.quantity += change;
    if (item.quantity <= 0) {
        cart = cart.filter(i => i.id !== itemId);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

// Show/hide cart panel
function toggleCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.style.display = cartDiv.style.display === 'none' ? 'block' : 'none';
}

// On page load
window.onload = () => {
    loadItems(currentCategory);
    updateCartUI();
};

function placeOrder() {
  const name = document.getElementById('customerName').value.trim();
  const phone = document.getElementById('customerPhone').value.trim();

  if (!name || !phone) {
    showToast("Please fill in your name and phone.");
    return;
  }

  if (cart.length === 0) {
    showToast("Your cart is empty!");
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const orderData = {
    items: cart,
    totalAmount: total,
    customerName: name,
    customerPhone: phone
  };

  fetch('http://localhost:5000/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  })
    .then(res => res.json())
    .then(data => {
      showToast("🎉 Order placed successfully!");
      cart = [];
      localStorage.removeItem('cart');
      updateCartUI();
      document.getElementById('customerName').value = '';
      document.getElementById('customerPhone').value = '';
    })
    .catch(err => {
      console.error('❌ Error placing order:', err);
      showToast("Something went wrong!");
    });
}
