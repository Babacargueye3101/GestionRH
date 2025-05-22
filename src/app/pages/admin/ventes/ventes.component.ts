import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateVenteComponent } from './create-vente/create-vente.component';
import { ShopService } from 'src/app/services/boutique/shop.service';
import { Shop } from 'src/app/models/shop';
import { ActivatedRoute } from '@angular/router';
import { PaymentMethodeComponent } from './payment-methode/payment-methode.component';
import { CanalComponent } from './canal/canal.component';
import { ListVentesComponent } from './list-ventes/list-ventes.component';
import { ViewChild } from '@angular/core';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-ventes',
  templateUrl: './ventes.component.html',
  styleUrls: ['./ventes.component.scss']
})
export class VentesComponent implements OnInit {
  @ViewChild(ListVentesComponent) listVentes!: ListVentesComponent;

  constructor(private dialog: MatDialog) {
    // Ajouter les imports nécessaires
  }

  ngOnInit() {
    // Initialisation du composant
  }

  exportToCsv() {
    if (this.listVentes) {
      const data = this.listVentes.ventes;
      const headers = Object.keys(data[0]);
      const csvContent = [
        headers.join(','),
        ...data.map(row => headers.map(header => {
          const cell = row[header];
          return typeof cell === 'string' ? cell.replace(/"/g, '""') : cell;
        }).join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const currentDate = new Date().toISOString().split('T')[0];
      saveAs(blob, `ventes_${currentDate}.csv`);
    }
  }

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

  openCreatePaymentMethodeModal() {
    const dialogRef = this.dialog.open(PaymentMethodeComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Vente créée avec succès', result);
      }
    });
  }

  openCreateCanalModal() {
    const dialogRef = this.dialog.open(CanalComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Vente créée avec succès', result);
      }
    });
  }

}
