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
  compagny = { name: 'Dabishpro' };
  cartItemCount = 0;
  clientForm!: FormGroup;
  paymentForm!: FormGroup;
  currentYear: number = new Date().getFullYear();

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private commandeService: CommandeService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCart();
    this.initForms();
  }

  initForms(): void {
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{9}')]],
      address: ['', Validators.required]
    });

    this.paymentForm = this.fb.group({
      paymentMethod: ['', Validators.required],
      mobilePhone: [''],
      paymentType: ['']
    });

    this.paymentForm.get('paymentMethod')?.valueChanges.subscribe(value => {
      if (value === 'mobile') {
        this.paymentForm.get('mobilePhone')?.setValidators([Validators.required, Validators.pattern('[0-9]{9}')]);
        this.paymentForm.get('paymentType')?.setValidators([Validators.required]);
      } else {
        this.paymentForm.get('mobilePhone')?.clearValidators();
        this.paymentForm.get('paymentType')?.clearValidators();
      }
      this.paymentForm.get('mobilePhone')?.updateValueAndValidity();
      this.paymentForm.get('paymentType')?.updateValueAndValidity();
    });
  }

  loadCart(): void {
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]');

    // Initialiser les champs quantity et selectedVariant
    this.cart = this.cart.map(product => ({
      ...product,
      quantity: product.quantity || 1,
      selectedVariant: product.selectedVariant || (product.variants?.length > 0 ? product.variants[0] : null)
    }));

    this.updateCartItemCount();
  }

  getProductPrice(product: any): number {
    // Fonction pour nettoyer le prix
    const cleanPrice = (price: any) => {
      if (!price) return 0;
      const str = price.toString();
      // Supprime tous les caractères non numériques SAUF le point décimal
      const cleaned = str.replace(/[^\d.,]/g, '')
                        .replace(',', '.'); // Convertit les virgules en points
      return parseFloat(cleaned) || 0;
    };
  
    // Si un variant est sélectionné, utiliser son prix
    if (product.selectedVariant && product.selectedVariant.price) {
      return cleanPrice(product.selectedVariant.price) * (product.quantity || 1);
    }
    // Sinon utiliser le prix de base du produit
    else if (product.price) {
      return cleanPrice(product.price) * (product.quantity || 1);
    }
    // Par défaut retourner 0 si aucun prix n'est trouvé
    return 0;
  }

  getTotalPrice(): number {
    return this.cart.reduce((sum, product) => sum + this.getProductPrice(product), 0);
  }

  updateCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.updateCartItemCount();
  }

  removeFromCart(product: any): void {
    this.cart = this.cart.filter(item => item.id !== product.id);
    this.updateCart();
    this.snackBar.open('Produit retiré du panier', 'Fermer', { duration: 3000 });
  }

  updateCartItemCount(): void {
    this.cartItemCount = this.cart.length;
  }

  confirmOrder(): void {
    if (this.clientForm.invalid || this.paymentForm.invalid) {
      this.snackBar.open('Veuillez remplir tous les champs obligatoires', 'Fermer', { duration: 3000 });
      return;
    }

    const paymentType = this.paymentForm.value.paymentType;

    if (paymentType === 'orange_money') {
      this.requestOrangeMoneyOTP();
    } else {
      this.processOrder();
    }
  }

  requestOrangeMoneyOTP(): void {
    Swal.fire({
      title: 'Code de paiement (6 chiffres)',
      text: 'Obtenez votre code de paiement depuis votre mobile en tapant #144#391#',
      input: 'text',
      inputPlaceholder: 'Entrez votre code OTP',
      inputAttributes: {
        maxlength: '6',
        pattern: '[0-9]{6}',
        required: 'true'
      },
      showCancelButton: true,
      confirmButtonText: 'Valider',
      cancelButtonText: 'Annuler',
      preConfirm: (otp) => {
        if (!/^\d{6}$/.test(otp)) {
          Swal.showValidationMessage('Veuillez entrer un code OTP valide (6 chiffres)');
        }
        return otp;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.processOrder(result.value);
      }
    });
  }

  processOrder(otpCode: string = ''): void {
    // Vérifier d'abord que les variants ont bien un prix
    const productsWithValidPrices = this.cart.every(product => {
      const hasVariantPrice = product.selectedVariant && !isNaN(parseFloat(product.selectedVariant.price));
      const hasBasePrice = !isNaN(parseFloat(product.price));
      return hasVariantPrice || hasBasePrice;
    });

    if (!productsWithValidPrices) {
      Swal.fire('Erreur', 'Certains produits n\'ont pas de prix valide', 'error');
      return;
    }

    const order = {
      client: this.clientForm.value,
      payment: { ...this.paymentForm.value, otp: otpCode },
      products: this.cart.map(product => {
        try {
          const unitPriceValue = product.selectedVariant?.price ?? product.price;
          const unitPrice = unitPriceValue ? parseFloat(unitPriceValue.toString().replace(/[^0-9.]/g, '')) : 0;
          const quantity = product.quantity || 1;

          return {
            id: product.id,
            name: product.name,
            variant: product.selectedVariant,
            quantity: quantity,
            unitPrice: unitPrice,
            totalPrice: unitPrice * quantity
          };
        } catch (e) {
          console.error('Erreur de traitement du produit:', product, e);
          return {
            id: product.id,
            name: product.name,
            variant: product.selectedVariant,
            quantity: product.quantity || 1,
            unitPrice: 0,
            totalPrice: 0
          };
        }
      }),
      total: this.getTotalPrice()
    };

    // Envoi au serveur
    this.commandeService.createCommande(order).subscribe(
      (response) => {
        if (response) {
          Swal.fire({
            title: 'Succès!',
            text: 'Votre commande a été enregistrée avec succès',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.route.navigate(['/public']);
          });

          this.cart = [];
          localStorage.removeItem('cart');
          this.updateCartItemCount();
        }
      },
      (error) => {
        console.error('Erreur lors de la commande :', error);
        Swal.fire({
          title: 'Erreur!',
          text: JSON.stringify(error.error),
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  }
}