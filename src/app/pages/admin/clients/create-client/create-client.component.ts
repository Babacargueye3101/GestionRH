import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ClientService } from 'src/app/services/clients/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss']
})
export class CreateClientComponent implements OnInit {
  clientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private dialogRef: MatDialogRef<CreateClientComponent>
  ) {
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      phone: [''],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients() {
    this.clientService.getClients().subscribe({
      next: (data) => {
        console.log('Clients:', data);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des clients:', err);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      this.clientService.createClient(this.clientForm.value).subscribe({
        next: (result) => {
          Swal.fire('Succès', 'Personnel ajouté avec succès', 'success');
          this.dialogRef.close(result);
          this.ngOnInit();
        },
        error: (err) => {
           Swal.fire('Erreur', 'Impossible d\'ajouter le personnel', err);
        }
      });
    }
  }
}