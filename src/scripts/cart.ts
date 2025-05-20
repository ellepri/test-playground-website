import { CartManager, CartItem } from './CartManager.js';

const cartContainer = document.querySelector('[data-cart-container]') as HTMLElement;
const totalItemsEl = document.querySelector('[data-cart-total-items]') as HTMLElement;
const totalPriceEl = document.querySelector('[data-cart-total-price]') as HTMLElement;
const cartBadge = document.querySelector('[data-cart-badge]') as HTMLElement;
const clearCartButton = document.getElementById('clearCart') as HTMLButtonElement;

function renderCart(): void {
    const cart = CartManager.getCart();
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty!</p>';
        totalItemsEl.textContent = '0';
        totalPriceEl.textContent = '$0.00';
        cartBadge.textContent = '0';
        cartBadge.classList.remove('show');
        return;
    }

    cart.forEach(item => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
          <img src="${item.imageUrl}" alt="${item.name}" class="cart-item-img">
          <div class="cart-item-info">
            <h4>${item.name}</h4>
            <p>Qty: ${item.quantity}</p>
            <p>Price: $${(item.price * item.quantity).toFixed(2)}</p>
            <div class="quantity-controls">
              <button class="decrease" data-action="decrease" data-name="${item.name}"
              ${item.quantity == 0 ? 'disabled' : ''}>-</button>
              <span class="quantity-number">${item.quantity}</span>
              <button class="increase" data-action="increase" data-name="${item.name}">+</button>
            </div>
          </div>
         `;
        cartContainer.appendChild(div);
    });

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    totalItemsEl.textContent = totalItems.toString();
    totalPriceEl.textContent = `$${totalPrice.toFixed(2)}`;
    cartBadge.textContent = totalItems.toString();
    cartBadge.classList.add('show');
}

function updateCartBadge(): void {
    const totalItems = CartManager.getTotalItems();
    cartBadge.textContent = totalItems.toString();
    if (totalItems > 0) {
        cartBadge.classList.add('show');
    } else {
        cartBadge.classList.remove('show');
    }
}

clearCartButton.addEventListener('click', () => {
    CartManager.clearCart();
    renderCart();
    updateCartBadge();
});

cartContainer.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (!target.matches('button')) return;

    const action = target.dataset.action;
    const name = target.dataset.name;

    if (!action || !name) return;

    let cart = CartManager.getCart();
    const item = cart.find(p => p.name === name);

    if (!item) return;

    if (action === 'increase') {
        item.quantity++;
    } else if (action === 'decrease') {
        if (item.quantity > 0) {
            item.quantity--;
        }
    }

    CartManager.saveCart(cart);
    updateCartBadge();
    renderCart();
});

// Initialize on page load
renderCart();
updateCartBadge();
