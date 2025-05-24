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
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface jsPDFWithAutoTable extends jsPDF {
  autoTable: (options: any) => jsPDF;
}

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

  exportToPdf() {
    if (this.listVentes) {
      const data = this.listVentes.ventes;
      const headers = Object.keys(data[0]);
      
      const doc = new jsPDF() as jsPDFWithAutoTable;
      
      // Titre du document
      doc.setFontSize(16);
      doc.text('Liste des Ventes', 14, 15);
      
      // Date d'exportation
      doc.setFontSize(10);
      const currentDate = new Date().toLocaleDateString();
      doc.text(`Date d'exportation: ${currentDate}`, 14, 25);
      
      // Création du tableau
      const tableData = data.map(row => headers.map(header => row[header]));
      
      doc.autoTable({
        head: [headers],
        body: tableData,
        startY: 30,
        theme: 'grid',
        styles: { fontSize: 8 },
        headStyles: { fillColor: [41, 128, 185], textColor: 255 },
        margin: { top: 30 }
      });
      
      // Sauvegarde du PDF
      doc.save(`ventes_${currentDate.replace(/\//g, '-')}.pdf`);
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
