import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-vente-details-dialog',
  templateUrl: './vente-details-dialog.component.html',
  styleUrls: ['./vente-details-dialog.component.scss']
})
export class VenteDetailsDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
