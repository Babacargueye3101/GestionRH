import { Component } from '@angular/core';

@Component({
  selector: 'app-boutique',
  templateUrl: './boutique.component.html',
  styleUrls: ['./boutique.component.scss']
})
export class BoutiqueComponent {

  createShop() {
    // Logique pour créer une boutique (par exemple ouvrir un formulaire ou une modal)
    console.log("Création d'une nouvelle boutique");
  }
}
