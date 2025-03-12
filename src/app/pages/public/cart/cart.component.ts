import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: any[] = [];
  compagny = { name: 'Votre Compagnie' };
  cartItemCount = 0;
  selectedPaymentMethod: string = 'card';

  constructor() {}

  ngOnInit(): void {
    this.loadCart();
    this.updateCartItemCount();
  }

  loadCart(): void {
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
  }

  removeFromCart(product: any): void {
    this.cart = this.cart.filter(item => item.id !== product.id);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.updateCartItemCount();
  }

  clearCart(): void {
    this.cart = [];
    localStorage.removeItem('cart');
    this.updateCartItemCount();
  }

  updateCartItemCount(): void {
    this.cartItemCount = this.cart.length;
  }

  getTotalPrice(): string {
    const total = this.cart.reduce((sum, item) => sum + parseFloat(item.price.replace('$', '')), 0);
    return `$${total.toFixed(2)}`;
  }
}