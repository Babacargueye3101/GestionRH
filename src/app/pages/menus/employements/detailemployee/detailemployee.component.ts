import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PdfcontratviewComponent } from '../pdfcontratview/pdfcontratview.component';

@Component({
  selector: 'app-detailemployee',
  templateUrl: './detailemployee.component.html',
  styleUrls: ['./detailemployee.component.scss']
})
export class DetailemployeeComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DetailemployeeComponent>,
    private dialog: MatDialog
  ) {

  }

  onClose(): void {
    this.dialogRef.close();
  }

  viewDocument() {
    this.dialog.open(PdfcontratviewComponent, {
      data: { url: this.data.url },
      width: '90%',
      height: '90%'
    })
  }
  getAge(birthdate: string): number {
    // Convertir la chaîne en un objet Date
    if (birthdate) {
      const birthdateObj = new Date(birthdate);
      const today = new Date();
      let age = today.getFullYear() - birthdateObj.getFullYear();
      const monthDifference = today.getMonth() - birthdateObj.getMonth();

      // Vérifier si l'anniversaire de cette année est déjà passé
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthdateObj.getDate())) {
        age--;
      }

      return age;
    }else{

      return 0;
    }
  }
}
