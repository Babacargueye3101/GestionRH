import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Shop } from 'src/app/models/shop';
import { ShopService } from 'src/app/services/boutique/shop.service';
import { SalonService } from 'src/app/services/salons/salon.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-salon',
  templateUrl: './create-salon.component.html',
  styleUrls: ['./create-salon.component.scss']
})
export class CreateSalonComponent implements OnInit{

  salonForm: FormGroup;
  listShop: Shop[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateSalonComponent>,
    private salonService: SalonService,
    private boutiqueService: ShopService
  ) {
    this.salonForm = this.fb.group({
      shop_id: ['', Validators.required], // Ajout du champ pour sélectionner la boutique
      name: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^\\+221\\s?\\d{2}\\s?\\d{3}\\s?\\d{2}\\s?\\d{2}$')]],
      description: ['', [Validators.required, Validators.maxLength(200)]]
    });
    this.dialogRef.disableClose = false;
  }

  ngOnInit(): void {
    this.boutiqueService.getShops().subscribe(
      (response) => {
        this.listShop = response;
      },
      (error) => {
        console.error("Erreur de récupération des boutiques :", error);
      }
    );
  }

  onSubmit(): void {
    if (this.salonForm.invalid) {
      Swal.fire('Erreur', 'Veuillez remplir tous les champs correctement', 'error');
      return;
    }

    const salonData = this.salonForm.value;

    this.salonService.createSalon(salonData.shop_id, salonData).subscribe(
      (response) => {
        Swal.fire('Succès', 'Salon créé avec succès', 'success');
        this.dialogRef.close(response);
      },
      (error) => {
        Swal.fire('Erreur', 'Une erreur est survenue', 'error');
        console.error(error);
      }
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
