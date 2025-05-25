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
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

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
      // Filtrer les ventes du mois en cours
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
      
      const data = this.listVentes.ventes.filter(vente => {
        const venteDate = new Date(vente.date);
        return venteDate.getMonth() === currentMonth && 
               venteDate.getFullYear() === currentYear;
      });

      if (data.length === 0) {
        console.log('Aucune vente pour le mois en cours');
        return;
      }

      const headers = Object.keys(data[0]);
      
      // Calculer le total des ventes
      const totalVentes = data.reduce((total, vente) => {
        const montant = typeof vente.montant === 'string' ? 
          parseFloat(vente.montant.replace(/[^0-9.-]+/g, '')) : 
          parseFloat(vente.montant) || 0;
        return total + montant;
      }, 0);

      const doc = new jsPDF();
      
      // Titre du document
      doc.setFontSize(16);
      const mois = new Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(now);
      doc.text(`Liste des Ventes - ${mois} ${currentYear}`, 14, 15);
      
      // Total des ventes
      doc.setFontSize(12);
      doc.setTextColor(41, 128, 185); // Bleu pour mettre en évidence
      doc.text(`Total des ventes: ${totalVentes.toLocaleString('fr-FR')} FCFA`, 14, 25);
      doc.setTextColor(0); // Remettre la couleur en noir
      
      // Date d'exportation
      doc.setFontSize(10);
      const currentDate = new Date().toLocaleDateString();
      doc.text(`Date d'exportation: ${currentDate}`, 14, 35);
      
      // Création du tableau
      const tableData = data.map(row => headers.map(header => row[header]));
      
      autoTable(doc, {
        head: [headers],
        body: tableData,
        startY: 40,
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
