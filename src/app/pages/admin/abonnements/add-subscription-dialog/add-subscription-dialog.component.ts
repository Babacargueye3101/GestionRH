import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AbonnementService } from 'src/app/services/abonnement.service';
import { ClientService } from 'src/app/services/clients/client.service';


@Component({
  selector: 'app-add-subscription-dialog',
  templateUrl: './add-subscription-dialog.component.html',
  styleUrls: ['./add-subscription-dialog.component.scss']
})
export class AddSubscriptionDialogComponent implements OnInit {
  form: FormGroup;
  subscriptionTypes: any[] = [];
  clients: any[] = [];

  constructor(
    private fb: FormBuilder,
    private abonnementService: AbonnementService,
    public dialogRef: MatDialogRef<AddSubscriptionDialogComponent>,
  private clientService: ClientService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      client_id: [''],
      subscription_type_id: ['']
    });
  }

  ngOnInit(): void {
    this.abonnementService.getSubscriptionTypes().subscribe((data: any) => {
      this.subscriptionTypes = data;
    });
    this.loadClients();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

    loadClients() {
      this.clientService.getClients().subscribe({
        next: (data) => {
          console.log('Clients:', data);
          this.clients = data;
        },
        error: (err) => {
          console.error('Erreur lors du chargement des clients:', err);
        }
      });
    }

  onSave(): void {
    const payload = this.form.value;
    this.abonnementService.addSubscription(payload).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

}