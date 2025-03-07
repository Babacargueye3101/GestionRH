import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VenteService } from 'src/app/services/ventes/vente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vente-details-dialog',
  templateUrl: './vente-details-dialog.component.html',
  styleUrls: ['./vente-details-dialog.component.scss']
})
export class VenteDetailsDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ventService: VenteService) {}


  downloadInvoice(venteId: number, shopId: number) {
    shopId=this.data.shopId
    venteId=this.data.venteId
    this.ventService.downloadInvoice(venteId, shopId).subscribe((pdfBlob: Blob) => {
      const blob = new Blob([pdfBlob], { type: 'application/pdf' });

      // Créer une URL pour le blob
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `facture_${venteId}.pdf`; // Nom du fichier à télécharger
      link.click(); // Simule un clic pour lancer le téléchargement
    }, error => {
      console.error('Erreur lors du téléchargement de la facture:', error);
    });
  }
}
