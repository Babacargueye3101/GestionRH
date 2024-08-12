import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { CongesService } from 'src/app/services/conges.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-demandeconges',
  templateUrl: './demandeconges.component.html',
  styleUrls: ['./demandeconges.component.scss']
})
export class DemandecongesComponent implements OnInit {

  addConges!: FormGroup;
  days_taken!: number;

  leaveTypes = [
    { value: 'paid', viewValue: 'Congés Payés' },
    { value: 'sick', viewValue: 'Congés Maladie' },
    { value: 'unpaid', viewValue: 'Congés Sans Solde' },
    { value: 'parental', viewValue: 'Congés Parentaux' },
    { value: 'sabbatical', viewValue: 'Congés Sabbatiques' },
    { value: 'annual', viewValue: 'Congés Annuels' },
    { value: 'child_sick', viewValue: 'Congés pour Enfants Malades' },
    { value: 'training', viewValue: 'Congés de Formation' },
    { value: 'family', viewValue: 'Congés pour Raisons Familiales' },
    { value: 'volunteer', viewValue: 'Congés pour Volontariat' },
    { value: 'recovery', viewValue: 'Congés de Récupération' },
    { value: 'travel', viewValue: 'Congés pour Voyage' }
  ];
  user: string | null;
  currentUser: any;

  constructor(
    public dialogRef: MatDialogRef<DemandecongesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private congeservice: CongesService,
    private spinnerService: NgxSpinnerService
  ) {

    this.user = localStorage.getItem('currentUser');
    if (this.user) {
      this.currentUser = JSON.parse(this.user);
    }
    this.addConges = this.fb.group({
      leave_type: [data?.leave_type || '', Validators.required],
      start_date: [data?.start_date || '', Validators.required],
      end_date: [data?.end_date || '', Validators.required],
      reason: [data?.reason || ''],
      nbreday: [{ value: '', disabled: true }],
      employee_id: [this.currentUser.id],
      status: ['en_attente'],
      days_taken: [this.days_taken]
    });
  }

  ngOnInit(): void {
    this.days_taken = 0;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.addConges.valid) {
      this.spinnerService.show();
      this.congeservice.createConge(this.addConges.value).subscribe(
        response => {
          this.spinnerService.hide();
          Swal.fire({
            title: 'Succès',
            text: 'Congé créé avec succès.',
            icon: 'success',
            showConfirmButton: true,
          });
          this.dialogRef.close();
        },
        error => {
          Swal.fire({
            title: 'Erreur',
            text: 'Une erreur est survenue. Veuillez réessayer.',
            icon: 'error',
            showConfirmButton: true,
          });
          this.spinnerService.hide();
          console.error('Erreur lors de la création du congé', error);
        }
      );
    }
  }

  calculateNumberOfDays(): void {
    const startDate = this.addConges.get('start_date')?.value;
    const endDate = this.addConges.get('end_date')?.value;

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const timeDiff = Math.abs(end.getTime() - start.getTime());
      this.days_taken = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
      this.addConges.get('days_taken')?.setValue(this.days_taken);
    } else {
      this.addConges.get('days_taken')?.setValue(0);
    }
  }
}
