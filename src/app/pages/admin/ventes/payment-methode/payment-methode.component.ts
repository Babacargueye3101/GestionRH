import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PaymentMethodeService } from 'src/app/services/payment-methode.service';
import Swal from 'sweetalert2';
import { CanalComponent } from '../canal/canal.component';

@Component({
  selector: 'app-payment-methode',
  templateUrl: './payment-methode.component.html',
  styleUrls: ['./payment-methode.component.scss']
})
export class PaymentMethodeComponent {

  paymentMethodeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private paymentMethodeService: PaymentMethodeService,
    private dialogRef: MatDialogRef<CanalComponent>
  ) {
    // Initialisation du formulaire
    this.paymentMethodeForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Charger les méthodes de paiement au démarrage si nécessaire
  }

  // Ajouter une méthode de paiement
  addPaymentMethode(): void {
    if (this.paymentMethodeForm.valid) {
      const paymentMethodeData = {
        payment_methode: {
          name: this.paymentMethodeForm.value.name
        }
      };

      this.paymentMethodeService.createPaymentMethode(paymentMethodeData).subscribe(
        (response) => {
          Swal.fire('Méthode de paiement ajoutée', '', 'success');
          this.paymentMethodeForm.reset();
        },
        (error) => {
          Swal.fire('Erreur', 'Une erreur est survenue lors de l\'ajout', 'error');
        }
      );
    }
  }
  closeModal(): void {
    this.dialogRef.close();
  }
}
