import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateVenteComponent } from './create-vente/create-vente.component';
import { ShopService } from 'src/app/services/boutique/shop.service';
import { Shop } from 'src/app/models/shop';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ventes',
  templateUrl: './ventes.component.html',
  styleUrls: ['./ventes.component.scss']
})
export class VentesComponent{

  constructor(private dialog: MatDialog) {}
  openCreateVenteModal() {
    const dialogRef = this.dialog.open(CreateVenteComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Vente créée avec succès', result);
      }
    });
  }

}
