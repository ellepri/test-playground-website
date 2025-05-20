export interface CartItem {
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
}

export class CartManager {
    private static CART_KEY = 'cart';

    private static getCartData(): string {
        return localStorage.getItem(CartManager.CART_KEY) || '[]';
    }
    
    static getCart(): CartItem[] {
        return JSON.parse(this.getCartData());
    }

    static saveCart(cart: CartItem[]): void {
        localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
    }

    static addItem(item: CartItem): void {
        const cart = CartManager.getCart();
        const existingItem = cart.find(cartItem => cartItem.name === item.name);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push(item);
        }

        this.saveCart(cart);
    }

    static removeItem(name: string): void {
        const cart = this.getCart().filter(item => item.name !== name);
        this.saveCart(cart);
    }

    static clearCart(): void {
        localStorage.removeItem(this.CART_KEY);
    }

    static getTotalItems(): number {
        const cart = this.getCart();
        return cart.reduce((sum, item) => sum + item.quantity, 0);
    }
}
