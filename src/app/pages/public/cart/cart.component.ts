import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommandeService } from 'src/app/services/public/commande.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: any[] = [];
  compagny = { name: 'Votre Compagnie' };
  cartItemCount = 0;
  clientForm!: FormGroup;
  paymentForm!: FormGroup;
  cartForm!: FormGroup;

  currentYear: number = new Date().getFullYear();

  constructor(private fb: FormBuilder, private route: Router, private commandeService: CommandeService) {}

  ngOnInit(): void {
    this.loadCart();
    this.updateCartItemCount();

    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{9}')]],
      address: ['', Validators.required]
    });

    this.paymentForm = this.fb.group({
      paymentMethod: ['', Validators.required],
      mobilePhone: ['']
    });

    // Validation conditionnelle pour le téléphone mobile
    this.paymentForm.get('paymentMethod')?.valueChanges.subscribe(value => {
      if (value === 'mobile') {
        this.paymentForm.get('mobilePhone')?.setValidators([Validators.required, Validators.pattern('[0-9]{9}')]);
      } else {
        this.paymentForm.get('mobilePhone')?.clearValidators();
      }
      this.paymentForm.get('mobilePhone')?.updateValueAndValidity();
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
    if (this.clientForm.invalid || this.paymentForm.invalid) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const order = {
      client: this.clientForm.value,
      payment: this.paymentForm.value,
      products: this.cart,
      total: this.getTotalPrice()
    };

    this.commandeService.createCommande(order).subscribe((response) => {
      console.log('Commande passée :', response);
      Swal.fire({
        title: 'Succès!',
        text: 'Votre commande a été enregistré avec Success',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        this.route.navigate(['/public']);
      });
      this.cart = [];
      localStorage.removeItem('cart');
      this.updateCartItemCount();
    }, (error) => {
      console.log(error);
    })
  }
}