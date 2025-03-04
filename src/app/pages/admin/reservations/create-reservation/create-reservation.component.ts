import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { ShopService } from 'src/app/services/boutique/shop.service';
import { DisponibilityService } from 'src/app/services/disponibility/disponibility.service';
import { ReservationService } from 'src/app/services/reservations/reservation.service';
import { SalonService } from 'src/app/services/salons/salon.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.scss']
})
export class CreateReservationComponent implements OnInit{
  // reservationForm: FormGroup;
  // availabilitySlots: any[] = [];  // Liste des créneaux de disponibilité

  // shops: any[] = [];
  // salons: any[] = [];

  // constructor(
  //   private fb: FormBuilder,
  //   private reservationService: ReservationService,
  //   private router: Router,
  //   private dialogRef: MatDialogRef<CreateReservationComponent>,
  //   private disponibilityService: DisponibilityService,
  //   private shopService: ShopService,
  //   private salonService: SalonService
  // ) {
  //   this.reservationForm = this.fb.group({
  //     name: ['', Validators.required],
  //     surname: ['', Validators.required],
  //     email: ['', [Validators.required, Validators.email]],
  //     phone: ['', Validators.required],
  //     shop_id: ['', Validators.required],
  //     salon_id: ['', Validators.required],
  //     availability_id: ['', Validators.required],
  //     time: ['', Validators.required]
  //   });
  // }

  ngOnInit(): void {
    // this.fetchShops();
  }

  // fetchShops() {
  //   // Charger les boutiques
  //   this.shopService.getShops().subscribe((response) => {
  //     this.shops = response;
  //   }, (error) => {
  //     console.error('Erreur lors du chargement des boutiques', error);
  //   });
  // }

  // onShopChange(event: MatSelectChange): void {
  //   const shopId = event.value;
  //   console.log("Boutique sélectionnée :", shopId);

  //   if (!shopId) return;

  //   // Charger les salons selon la boutique sélectionnée
  //   this.salonService.getSalons(shopId).subscribe(
  //     (salons) => {
  //       console.log("Salons récupérés :", salons);
  //       this.salons = salons;
  //       // Réinitialiser la sélection de salon et créneaux
  //       this.reservationForm.patchValue({ salon_id: '', availability_id: '' });
  //       this.availabilitySlots = [];  // Vider les créneaux
  //     },
  //     (error) => {
  //       console.error("Erreur lors du chargement des salons :", error);
  //     }
  //   );
  // }

  // onSalonChange(event: MatSelectChange): void {
  //   const salonId = event.value;
  //   console.log("Salon sélectionné :", salonId);

  //   if (!salonId) return;

  //   // Charger les créneaux de disponibilité pour le salon sélectionné
  //   this.disponibilityService.getAvailabilitiesBySalon(salonId).subscribe(
  //     (slots) => {
  //       console.log("Créneaux récupérés :", slots);
  //       this.availabilitySlots = slots;
  //     },
  //     (error) => {
  //       console.error("Erreur lors du chargement des créneaux :", error);
  //     }
  //   );
  // }

  // onSubmit() {
  //   if (this.reservationForm.invalid) {
  //     return;
  //   }

  //   const reservationData = {
  //     client: {
  //       name: this.reservationForm.value.name,
  //       surname: this.reservationForm.value.surname,
  //       email: this.reservationForm.value.email,
  //       phone: this.reservationForm.value.phone
  //     },
  //     shop_id: this.reservationForm.value.shop_id,
  //     salon_id: this.reservationForm.value.salon_id,
  //     availability_id: this.reservationForm.value.availability_id,
  //     time: this.reservationForm.value.time
  //   };

  //   this.reservationService.createReservation(reservationData).subscribe(
  //     (response) => {
  //       Swal.fire('Succès', 'Réservation créée avec succès', 'success');
  //       this.dialogRef.close();  // Fermer le modal
  //       this.router.navigate(['/reservations']);  // Rediriger vers la liste des réservations
  //     },
  //     (error) => {
  //       Swal.fire('Erreur', 'Impossible de créer la réservation', 'error');
  //     }
  //   );
  // }

  // onCancel() {
  //   this.dialogRef.close();  // Ferme le modal sans effectuer d'action
  // }
}
