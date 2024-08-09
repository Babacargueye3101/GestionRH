import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent {


  editEmployeeForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {

    this.editEmployeeForm = this.fb.group({
      contratType: [data.contrat_type || ''],
      salary: [data.salary || ''],
      firstName: [data.first_name || ''],
      lastName: [data.last_name || ''],
      email: [data.email || ''],
      position: [data.position || ''],
      phone: [data.phone || '']
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {

    const updatedEmployee = {
      id: this.data.id,
      contrat_type: this.editEmployeeForm.value.contratType,
      salary: this.editEmployeeForm.value.salary,
      first_name: this.editEmployeeForm.value.firstName,
      last_name: this.editEmployeeForm.value.lastName,
      email: this.editEmployeeForm.value.email
    };
    this.dialogRef.close(updatedEmployee);
  }
}
