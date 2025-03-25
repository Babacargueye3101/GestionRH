import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-apropos',
  templateUrl: './apropos.component.html',
  styleUrls: ['./apropos.component.scss']
})
export class AproposComponent implements OnInit{
  currentYear: number = new Date().getFullYear();

  description = `Bienvenue sur notre plateforme, votre destination incontournable pour l'achat et la location de biens et services variés.
  Nous offrons une gamme complète incluant la vente de produits, de terrains, la location de salons, ainsi que des services d'abonnement et de réservation.
  Notre mission est de vous fournir une expérience simple, rapide et sécurisée grâce à une interface intuitive et un service client dédié.`;

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
