import { CartManager, CartItem } from './CartManager.js';

const cartBadge = document.querySelector('[data-cart-badge]') as HTMLDivElement;
const productsPage = document.querySelector('.products-page');

function updateCartBadge(): void {
    const totalItems = CartManager.getTotalItems();
    cartBadge.textContent = totalItems.toString();
    if (totalItems > 0) {
        cartBadge.classList.add('show');
    } else {
        cartBadge.classList.remove('show');
    }
}

function showOrHideRemoveButton(productCard: HTMLElement): void {
    const name = (productCard.querySelector('.product-name') as HTMLElement).innerText;
    const cart = CartManager.getCart();
    const exists = cart.some(item => item.name === name);

    const removeButton = productCard.querySelector('[data-remove-from-cart]') as HTMLButtonElement;
    if (exists) {
        removeButton.style.display = 'flex';
    } else {
        removeButton.style.display = 'none';
    }
}

productsPage?.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;

    if (target.matches('[data-add-to-cart]')) {
        const productCard = target.closest('.product-card') as HTMLElement;
        const productName = (productCard.querySelector('.product-name') as HTMLElement).innerText;
        const productPriceText = (productCard.querySelector('.product-price') as HTMLElement).innerText;
        const productPrice = parseFloat(productPriceText.replace('$', ''));
        const imageUrl = (productCard.querySelector('img') as HTMLImageElement).src;

        const newItem: CartItem = {
            name: productName,
            price: productPrice,
            quantity: 1,
            imageUrl: imageUrl
        };

        CartManager.addItem(newItem);
        updateCartBadge();
        showOrHideRemoveButton(productCard);
    }

    if (target.matches('[data-remove-from-cart]')) {
        const productCard = target.closest('.product-card') as HTMLElement;
        const name = (productCard.querySelector('.product-name') as HTMLElement).innerText;

        CartManager.removeItem(name);
        updateCartBadge();
        showOrHideRemoveButton(productCard);
    }
});

// On page load, check every card if item exists in cart
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => showOrHideRemoveButton(card as HTMLElement));

// Initialize badge on page load
updateCartBadge();
