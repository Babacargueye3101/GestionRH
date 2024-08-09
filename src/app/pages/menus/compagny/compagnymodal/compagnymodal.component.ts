import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompagnyService } from 'src/app/services/compagny.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-compagnymodal',
  templateUrl: './compagnymodal.component.html',
  styleUrls: ['./compagnymodal.component.scss']
})
export class CompagnymodalComponent implements OnInit{

  companyForm: FormGroup;
  compagnies: any;

  constructor(public dialogRef: MatDialogRef<CompagnymodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder, private compagnyService: CompagnyService, private spinnerService: NgxSpinnerService ){

      this.companyForm = this.fb.group({
        name: ['', Validators.required],
        address: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        countrie: ['', Validators.required],
        zipCode: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        website: [''],
        description: ['']
      });
  }
  ngOnInit(): void {

  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.companyForm.valid) {
      this.spinnerService.show();
      this.compagnyService.createCompany(this.companyForm.value).subscribe(
        response => {
          this.spinnerService.hide();
          Swal.fire({
            title: 'Success',
            text: 'Compagny crée  avec succès.',
            icon: 'success',
            showConfirmButton: true,
          })
          this.dialogRef.close();
        },
        error => {
          Swal.fire({
            title: 'Erreur',
            text: 'Try again',
            icon: 'error',
            showConfirmButton: true,
          })
          console.error('Error creating company', error);
        }
      );
    }
    this.ngOnInit();
  }
}
