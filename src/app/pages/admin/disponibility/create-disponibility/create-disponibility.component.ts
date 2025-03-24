import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { ShopService } from 'src/app/services/boutique/shop.service';
import { DisponibilityService } from 'src/app/services/disponibility/disponibility.service';
import { SalonService } from 'src/app/services/salons/salon.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-disponibility',
  templateUrl: './create-disponibility.component.html',
  styleUrls: ['./create-disponibility.component.scss']
})
export class CreateDisponibilityComponent {
  availabilityForm: FormGroup;
  availableTimeSlots: string[] = [
    "08:00 - 10:00", "10:15 - 12:15", "12:15 - 14:15",
    "14:30 - 16:30", "16:45 - 18:45", "19:00 - 21:00"
  ];
  shops: any[] = [];
  salons: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateDisponibilityComponent>,
    private disponibilityService: DisponibilityService,
    private shopService: ShopService,
    private salonService: SalonService
  ) {
    this.availabilityForm = this.fb.group({
      shop_id: ['', Validators.required],
      salon_id: ['', Validators.required],
      date: ['', Validators.required],
      time_slots: [[], Validators.required]
    });
  }

  ngOnInit() {
    this.loadShops();
    this.loadAllTimeSlots();
  }

  loadShops() {
    this.shopService.getShops().subscribe(
      (data) => {
        console.log("Boutiques récupérées :", data);
        this.shops = data;
      },
      (error) => {
        console.error("Erreur lors du chargement des boutiques :", error);
      }
    );
  }
  loadAllTimeSlots() {
    this.disponibilityService.getAllHoraires().subscribe(
      (response) => {
        this.availableTimeSlots = response.map((slot: any) => slot.time_range); // Extraction de time_range
      },
      (error) => {
        console.error("Erreur lors du chargement des créneaux horaires :", error);
      }
    );
  }

  onShopChange(event: MatSelectChange): void {
    const shopId = event.value;
    console.log("Shop sélectionné :", shopId);

    if (!shopId) return;

    this.salonService.getSalons(shopId).subscribe(
      (salons) => {
        console.log("Salons récupérés :", salons);
        this.salons = salons;
        this.availabilityForm.patchValue({ salon_id: '' }); // Réinitialise le salon
      },
      (error) => {
        console.error("Erreur lors du chargement des salons :", error);
      }
    );
  }

  onSubmit() {
    if (this.availabilityForm.invalid) {
      Swal.fire('Erreur', 'Veuillez remplir tous les champs', 'error');
      return;
    }

    const payload = {
      availability: {
        date: this.availabilityForm.value.date.toISOString().split('T')[0], // Format YYYY-MM-DD
        time_slots: this.availabilityForm.value.time_slots
      }
    };

    const salonId = this.availabilityForm.value.salon_id;

    this.disponibilityService.createAvailability(salonId, payload).subscribe(
      () => {
        Swal.fire('Succès', 'Disponibilité créée avec succès', 'success');
        this.dialogRef.close(true);
      },
      (error) => {
        console.error("Erreur lors de la création de la disponibilité :", error);
        Swal.fire('Erreur', 'Impossible de créer la disponibilité', 'error');
      }
    );
  }

  onCancel() {
    this.dialogRef.close();
  }
}
