import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewChild, ElementRef, Renderer2 } from '@angular/core';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: any[] = [];
  compagny = { name: 'Votre Compagnie' };
  cartItemCount = 0;
  selectedPaymentMethod: string = '';
  clientForm!: FormGroup;
  paymentForm!: FormGroup;
  cartForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadCart();
    this.updateCartItemCount();
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{9}')]],
      address: ['', Validators.required]
    });

    this.paymentForm = this.fb.group({
      paymentMethod: ['', Validators.required]
    });

    this.cartForm = this.fb.group({
      fullName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{9}')]],
      address: ['', Validators.required],
      paymentMethod: ['card', Validators.required]
    });

  }

  loadCart(): void {
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
  }

  removeFromCart(product: any): void {
    this.cart = this.cart.filter(item => item.id !== product.id);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.updateCartItemCount();
  }

  updateCartItemCount(): void {
    this.cartItemCount = this.cart.length;
  }

  getTotalPrice(): string {
    const total = this.cart.reduce((sum, item) => sum + parseFloat(item.price.replace('$', '')), 0);
    return `$${total.toFixed(2)}`;
  }

  confirmOrder(): void {
    alert('Commande confirmée ! Merci pour votre achat.');
    this.cart = [];
    localStorage.removeItem('cart');
    this.updateCartItemCount();
  }
}