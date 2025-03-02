import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Shop } from 'src/app/models/shop';
import { ShopService } from 'src/app/services/boutique/shop.service';
import { PersonnelService } from 'src/app/services/personnels/personnel.service';
import { SalonService } from 'src/app/services/salons/salon.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-personnel',
  templateUrl: './update-personnel.component.html',
  styleUrls: ['./update-personnel.component.scss']
})
export class UpdatePersonnelComponent {

  personnelForm: FormGroup;
  shops: Shop[] = [];
  salons: any[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dialogRef: MatDialogRef<UpdatePersonnelComponent>,
    private shopService: ShopService,
    private salonService: SalonService,
    private personnelService: PersonnelService,
    @Inject(MAT_DIALOG_DATA) public data: any // Récupérer les données du personnel à modifier
  ) {
    this.personnelForm = this.fb.group({
      first_name: [data.first_name],
      last_name: [data.last_name],
      address: [data.address],
      phone: [data.phone],
      email: [data.email],
      shop_id: [data.shop_id],  // La boutique du personnel
      salon_ids: [data.salon_ids || []],  // Les salons liés au personnel
      can_view_statistics: [data.can_view_statistics]
    });
  }

  ngOnInit() {
    this.fetchShops();
  }

  fetchShops() {
    this.shopService.getShops().subscribe(
      (response) => {
        this.shops = response;
        // On sélectionne la boutique du personnel existant
        if (this.personnelForm.value.shop_id) {
          this.onShopChange(); // Récupérer les salons liés à la boutique
        }
      },
      (error) => {
        console.error("Erreur lors de la récupération des boutiques", error);
      }
    );
  }

  onShopChange() {
    const shopId = this.personnelForm.value.shop_id;
    this.salons = []; // Réinitialiser la liste des salons
    this.personnelForm.patchValue({ salon_ids: [] }); // Réinitialiser la sélection des salons

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

    this.personnelService.updatePersonnel(this.data.id, payload).subscribe(
      (response) => {
        Swal.fire('Succès', 'Personnel mis à jour avec succès', 'success');
        this.dialogRef.close(true);
      },
      (error) => {
        Swal.fire('Erreur', 'Impossible de mettre à jour le personnel', error);
      }
    );
  }

  onCancel() {
    this.dialogRef.close();
  }
}
