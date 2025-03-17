import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbonnementComponent } from '../abonnement.component';
import { AbonnementPublicService } from 'src/app/services/public/abonnement-public.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-souscription-abonnement',
  templateUrl: './souscription-abonnement.component.html',
  styleUrls: ['./souscription-abonnement.component.scss']
})
export class SouscriptionAbonnementComponent implements OnInit {

  clientForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SouscriptionAbonnementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private abonnementService: AbonnementPublicService
  ) {}

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.clientForm.valid) {
      console.log('Form Submitted!', this.clientForm.value);
      const payload= this.clientForm.value
      this.abonnementService.createAbonnement(this.data.id, payload).subscribe((response) => {
        Swal.fire('Souscription réussi !!!!!', '', 'success');
      }, (error) => {
        console.log(error);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }


}
