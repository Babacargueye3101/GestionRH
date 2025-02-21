import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateBoutiqueComponent } from './create-boutique/create-boutique.component';

@Component({
  selector: 'app-boutique',
  templateUrl: './boutique.component.html',
  styleUrls: ['./boutique.component.scss']
})
export class BoutiqueComponent {

  constructor(private dialog: MatDialog) {}

  createShop() {
    this.dialog.open(CreateBoutiqueComponent, {
      width: '400px'
    });
    // Logique pour créer une boutique (par exemple ouvrir un formulaire ou une modal)
    console.log("Création d'une nouvelle boutique");
  }
}
