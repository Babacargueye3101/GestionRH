import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-apropos',
  templateUrl: './apropos.component.html',
  styleUrls: ['./apropos.component.scss']
})
export class AproposComponent implements OnInit{
  currentYear: number = new Date().getFullYear();

  description = `
  Née de la passion pour l'élégance, Dabishpro est une marque qui célèbre la beauté, la confiance et la diversité. 
  Nous avons commencé modestement avec une mission claire : offrir des produits et services qui transforment la routine en expérience de bien-être.

  Aujourd'hui, nous sommes fiers d'accompagner des milliers de femmes et d'hommes à travers le Sénégal dans leur quête de qualité et de style. 
  Nos services vont de la vente de produits de beauté à la réservation de prestations dans nos salons partenaires.

  Chez Dabishpro, chaque client est spécial. C’est pourquoi nous mettons un point d’honneur à proposer une interface intuitive, un service client réactif et des abonnements adaptés à vos besoins.

  Rejoignez notre univers où excellence, accessibilité et innovation se rencontrent pour faire rayonner votre beauté.
`;

  compagny = { name: 'Dabishpro' };

  socialLinks = [
    { icon: 'facebook', url: 'https://www.facebook.com/' },
    { icon: 'twitter', url: 'https://twitter.com/' },
    { icon: 'linkedin', url: 'https://www.linkedin.com/' },
    { icon: 'instagram', url: 'https://www.instagram.com/' }
  ];

  ngOnInit() {
    console.log(this.description);
  }

  openLink(url: string) {
    window.open(url, '_blank');
  }
}
