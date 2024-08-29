import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { RdvService } from 'src/app/services/rdv.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-rdv',
  templateUrl: './create-rdv.component.html',
  styleUrls: ['./create-rdv.component.scss'],
})
export class CreateRdvComponent implements OnInit {
  appointmentForm!: FormGroup;

  appointmentTypes: string[] = [
    "Entretien d'embauche",
    'Entretien annuel',
    'Entretien professionnel',
    "Réunion d'équipe",
    'Suivi post-recrutement',
    'Gestion des conflits',
    'Bilan de compétences',
    'Entretien de départ',
    'Réunion de planification des ressources humaines',
    'Entretien de retour après une absence prolongée',
  ];

  appointmentStatuses: { value: string; viewValue: string }[] = [
    { value: 'planned', viewValue: 'Planifié' },
    { value: 'in_progress', viewValue: 'En cours' },
    { value: 'completed', viewValue: 'Terminé' },
    { value: 'canceled', viewValue: 'Annulé' },
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateRdvComponent>,
    private rdvService: RdvService,
    private spinnerService: NgxSpinnerService
  ) {
    this.appointmentForm = this.fb.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      type: ['', Validators.required],
      status: ['', Validators.required],
      description: [''],
      location: [''],
      compagny_id: ['']
    });
  }

  ngOnInit(): void {}

  compagny: any;
  onSubmit() {
    if (this.appointmentForm.valid) {
      this.spinnerService.show();
      const user = localStorage.getItem('currentUser');

      if (user) {
        var currentUser = JSON.parse(user);
        this.compagny = currentUser.compagny_id;

        var appointment = {
          start_time: this.appointmentForm.get('date')?.value,
          end_time: this.combineDateAndTime(
            this.appointmentForm.get('date')?.value,
            this.appointmentForm.get('time')?.value
          ),
          location: this.appointmentForm.get('location')?.value,
          description: this.appointmentForm.get('description')?.value,
          status: this.appointmentForm.get('status')?.value,
          appointment_type: this.appointmentForm.get('type')?.value,
          compagny_id: this.compagny
        };

        this.rdvService.createAppointment(appointment).subscribe(
          (res) => {
            this.spinnerService.hide();
            Swal.fire({
              title: 'Création de RDV',
              text: 'Rendez-vous planifié avec Success',
              icon: 'success',
            });
            setTimeout(() => {
              location.reload;
            }, 1000);
            console.log(res);
          },
          (error) => {
            this.spinnerService.hide();
            Swal.fire({
              title: 'Erreur de Création',
              text: error,
              icon: 'error',
              showCancelButton: true,
            }).then((result) => {
              if (result.isConfirmed) {
                // Code à exécuter si l'utilisateur clique sur "Oui"
                console.log('Utilisateur a cliqué Oui');
              }
            });
          }
        );
      }
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  combineDateAndTime(date: Date | null, time: string | null): string {
    if (!date || !time) return '';

    const dateStr = new Date(date).toISOString().split('T')[0];
    const timeStr = time;
    return `${dateStr}T${timeStr}`;
  }
}
