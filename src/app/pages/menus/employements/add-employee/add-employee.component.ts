import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent {

  addEmployeeForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {

    this.addEmployeeForm = this.fb.group({
      contratType: [data?.contrat_type || '', Validators.required],
      salary: [data?.salary || '', Validators.required],
      firstName: [data?.first_name || '', Validators.required],
      lastName: [data?.last_name || '', Validators.required],
      email: [data?.email || '', [Validators.required, Validators.email]],
      position: [data?.position || '', Validators.required],
      phone: [data?.phone || '', Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    const updatedEmployee = {
      id: this.data?.id,
      contrat_type: this.addEmployeeForm.value.contratType,
      salary: this.addEmployeeForm.value.salary,
      first_name: this.addEmployeeForm.value.firstName,
      last_name: this.addEmployeeForm.value.lastName,
      email: this.addEmployeeForm.value.email,
      position: this.addEmployeeForm.value.position,
      phone: this.addEmployeeForm.value.phone
    };
    this.dialogRef.close(updatedEmployee);
  }
}
