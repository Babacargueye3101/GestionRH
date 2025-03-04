import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { Shop } from 'src/app/models/shop';
import { ShopService } from 'src/app/services/boutique/shop.service';
import { DisponibilityService } from 'src/app/services/disponibility/disponibility.service';
import { ReservationService } from 'src/app/services/reservations/reservation.service';
import { SalonService } from 'src/app/services/salons/salon.service';
import Swal from 'sweetalert2';
export interface Salon {
  id: number;
  name: string;
  // Ajoutez d'autres propriétés selon votre modèle Salon
}

export interface Availability {
  id: number;
  date: Date;
  time_slots: string[];
  // Ajoutez d'autres propriétés selon votre modèle Availability
}
@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.scss']
})
export class CreateReservationComponent implements OnInit{
  shops: Shop[] = [];  // Liste des boutiques
  salons: Salon[] = []; // Liste des salons
  availabilities: Availability[] = []; // Liste des disponibilités
  selectedAvailabilityId: number | null = null; // La disponibilité sélectionnée
  selectedTimeSlot: string | null = null; // Le créneau horaire sélectionné
  reservationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private shopService: ShopService,
    private salonService: SalonService,
    private disponibilityService: DisponibilityService,
    private reservationService: ReservationService
  ) {
    // Initialisation du formulaire
    this.reservationForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      shop: [null, Validators.required],
      salon: [null, Validators.required],
      availability: [null, Validators.required],
      timeSlot: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadShops(); // Charger les boutiques au démarrage
  }

  loadShops() {
    this.shopService.getShops().subscribe(shops => {
      this.shops = shops;
    });
  }

  onShopChange() {
    this.salons = [];
    this.availabilities = []; // Réinitialiser les disponibilités
    this.selectedAvailabilityId = null; // Réinitialiser la disponibilité sélectionnée
    this.selectedTimeSlot = null; // Réinitialiser le créneau horaire
    this.reservationForm.patchValue({ salon: null, availability: null, timeSlot: null });
    this.loadSalons();
  }

  loadSalons() {
    if (this.reservationForm.value.shop) {
      this.salonService.getSalons(this.reservationForm.value.shop).subscribe(salons => {
        this.salons = salons;
      });
    }
  }

  onSalonChange() {
    this.availabilities = []; // Réinitialiser les disponibilités
    this.selectedAvailabilityId = null; // Réinitialiser la disponibilité sélectionnée
    this.selectedTimeSlot = null; // Réinitialiser le créneau horaire
    this.reservationForm.patchValue({ availability: null, timeSlot: null });
    this.loadAvailabilities();
  }

  loadAvailabilities() {
    const { shop, salon } = this.reservationForm.value;
    if (shop && salon) {
      this.disponibilityService.getAvailabilitiesByShopAndSalon(shop, salon)
        .subscribe(availabilities => {
          this.availabilities = availabilities || [];
        });
    }
  }

  // Obtenir les créneaux horaires pour une disponibilité donnée
  getTimeSlotsForAvailability(availabilityId: number) {
    const availability = this.availabilities.find(avail => avail.id === availabilityId);
    return availability ? availability.time_slots : [];
  }

  createReservation() {
    if (this.reservationForm.valid) {
      const formValue = this.reservationForm.value;
      const reservationData = {
        client: {
          name: formValue.name,
          surname: formValue.surname,
          email: formValue.email,
          phone: formValue.phone
        },
        availability_id: formValue.availability,
        time: formValue.timeSlot
      };

      this.reservationService.createReservation(reservationData).subscribe(response => {
        Swal.fire('Réservation créée avec succès', '', 'success');
      }, error => {
        Swal.fire('Erreur', 'Une erreur est survenue', 'error');
      });
    } else {
      Swal.fire('Formulaire invalide', 'Veuillez remplir tous les champs', 'warning');
    }
  }
}
