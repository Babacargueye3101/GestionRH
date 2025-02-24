import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { SalonService } from 'src/app/services/salons/salon.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-service-salon',
  templateUrl: './create-service-salon.component.html',
  styleUrls: ['./create-service-salon.component.scss']
})
export class CreateServiceSalonComponent implements OnInit {

  serviceForm: FormGroup;
  shopId!: number;
  salonId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private salonService: SalonService,
    private dialogRef: MatDialogRef<CreateServiceSalonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.salonId = data.salonId;
    this.shopId = data.shopId;

    this.serviceForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [null, [Validators.required, Validators.min(0)]],
      duration: [null, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {


  }

  onSubmit(): void {
    if (this.serviceForm.valid) {
      const serviceData = {
        service: {
          name: this.serviceForm.value.name,
          description: this.serviceForm.value.description,
          price: this.serviceForm.value.price,
          duration: this.serviceForm.value.duration
        }
      };

      this.salonService.createService(this.shopId, this.salonId, serviceData).subscribe(
        () => {
          Swal.fire('Succès', 'Le service a été ajouté avec succès.', 'success');
          this.dialogRef.close(true);
        },
        (error) => {
          Swal.fire('Erreur', 'Échec de l\'ajout du service.', 'error');
          console.error(error);
        }
      );
    }
  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }
}
