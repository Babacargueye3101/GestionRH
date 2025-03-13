// filepath: /Users/xsorcier/Desktop/GestionRH/src/app/pages/admin/abonnements/add-edit-subscription-type-dialog/add-edit-subscription-type-dialog.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AbonnementService } from 'src/app/services/abonnement.service';


@Component({
  selector: 'app-add-edit-subscription-type-dialog',
  templateUrl: './add-edit-subscription-type-dialog.component.html',
  styleUrls: ['./add-edit-subscription-type-dialog.component.scss']
})
export class AddEditSubscriptionTypeDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private abonnementService: AbonnementService,
    public dialogRef: MatDialogRef<AddEditSubscriptionTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      name: [''],
      price: [''],
      description: [''],
      letter: [''],
      active: [false]
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.form.patchValue(this.data);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    const payload = this.form.value;
    console.log(payload)
    if (this.data) {
      this.abonnementService.updateSubscriptionType(this.data.id, payload).subscribe(() => {
        this.dialogRef.close(true);
      });
    } else {
      this.abonnementService.addSubscriptionType(payload).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }
}