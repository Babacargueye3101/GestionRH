import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CompagnyService } from 'src/app/services/compagny.service';


@Component({
  selector: 'app-edit-compagny',
  templateUrl: './edit-compagny.component.html',
  styleUrls: ['./edit-compagny.component.scss']
})
export class EditCompagnyComponent {

  editCompagnyForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditCompagnyComponent>,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private compagnyService: CompagnyService
  ) {
     console.log(data);

    this.editCompagnyForm = this.fb.group({
      name: [data.name || ''],
      countrie: [data.countrie || ''],
      address: [data.address || ''],
      city: [data.city || ''],
      description: [data.description || ''],
      phoneNumber: [data.phoneNumber || ''],
      website: [data.website || ''],
      email: [data.email || '']
    });

  }

  onSaveClick() {
    const updatedcompagny= {
      id: this.data.id,
      name: this.editCompagnyForm.value.name,
      countrie: this.editCompagnyForm.value.countrie,
      address: this.editCompagnyForm.value.address,
      city: this.editCompagnyForm.value.city,
      description: this.editCompagnyForm.value.description,
      phoneNumber: this.editCompagnyForm.value.phoneNumber,
      website: this.editCompagnyForm.value.website,
      email: this.editCompagnyForm.value.email
    };
    this.dialogRef.close(updatedcompagny);

  }

  onNoClick() {
    this.dialogRef.close();
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
