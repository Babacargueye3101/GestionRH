import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { response } from 'express';
import { Shop } from 'src/app/models/shop';
import { ShopService } from 'src/app/services/boutique/shop.service';
import { PersonnelService } from 'src/app/services/personnels/personnel.service';
import { SalonService } from 'src/app/services/salons/salon.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-personnel',
  templateUrl: './create-personnel.component.html',
  styleUrls: ['./create-personnel.component.scss']
})
export class CreatePersonnelComponent {
  personnelForm: FormGroup;
  shops: Shop[] = [];
  salons: any[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dialogRef: MatDialogRef<CreatePersonnelComponent>,
    private shopService: ShopService,
    private salonService: SalonService,
    private personnelService: PersonnelService
  ) {
    this.personnelForm = this.fb.group({
      first_name: [''],
      last_name: [''],
      address: [''],
      phone: [''],
      email: [''],
      shop_id: [null],  // Sélection unique pour la boutique
      salon_ids: [[]],  // Sélection multiple pour les salons
      can_view_statistics: [false]
    });
  }

  ngOnInit() {
    this.fetchShops();
  }

  fetchShops() {
    this.shopService.getShops().subscribe(
      (response) => {
        this.shops = response;
      },
      (error) => {
        console.error("Erreur lors de la récupération des boutiques", error);
      }
    );
  }

  onShopChange() {
    const shopId = this.personnelForm.value.shop_id;
    this.salons = []; // Réinitialiser la liste des salons
    this.personnelForm.patchValue({ salon_ids: [] }); // Réinitialiser la sélection

    if (shopId) {
      this.salonService.getSalons(shopId).subscribe(
        (response) => {
          this.salons = response;
        },
        (error) => {
          console.error("Erreur lors de la récupération des salons", error);
        }
      );
    }
  }

  onSubmit() {
    const payload = {
      personnel: {
        first_name: this.personnelForm.value.first_name,
        last_name: this.personnelForm.value.last_name,
        address: this.personnelForm.value.address,
        phone: this.personnelForm.value.phone,
        email: this.personnelForm.value.email,
        can_view_statistics: this.personnelForm.value.can_view_statistics
      },
      shop_id: this.personnelForm.value.shop_id,
      salon_ids: this.personnelForm.value.salon_ids
    };

    this.personnelService.createPersonnel(payload).subscribe(
      (response) => {
        Swal.fire('Succès', 'Personnel ajouté avec succès', 'success');
        this.dialogRef.close(true);
      },
      (error) => {
        Swal.fire('Erreur', 'Impossible d\'ajouter le personnel', error);
      }
    );
  }

  onCancel() {
    this.dialogRef.close();
  }
}
