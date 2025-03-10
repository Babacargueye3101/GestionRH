import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientService } from 'src/app/services/clients/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.scss']
})
export class UpdateClientComponent implements OnInit {
  clientForm: FormGroup;
  @Output() clientUpdated = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private dialogRef: MatDialogRef<UpdateClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.clientForm = this.fb.group({
      name: [data.name, Validators.required],
      surname: [data.surname, Validators.required],
      phone: [data.phone],
      email: [data.email, [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      this.clientService.updateClient(this.data.id, this.clientForm.value).subscribe({
        next: (result) => {
          Swal.fire('Succès', 'Personnel Modifier avec succès', 'success');
          this.clientUpdated.emit(result);
          this.dialogRef.close(result);
        },
        error: (err) => {
          Swal.fire('Erreur', 'Impossible de modifier le personnel', err);
        }
      });
    }
  }
}