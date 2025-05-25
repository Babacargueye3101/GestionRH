import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

interface TeamMember {
  name: string;
  position: string;
  image: string;
  social: { icon: string; url: string }[];
  delay: string;
}

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface Value {
  icon: string;
  title: string;
  description: string;
  delay: string;
}

@Component({
  selector: 'app-apropos',
  templateUrl: './apropos.component.html',
  styleUrls: ['./apropos.component.scss']
})
export class AproposComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  currentYear: number = new Date().getFullYear();
  compagny = { name: 'Dabishpro' };
  isMobile = false;

  // Données de l'équipe
  teamMembers: TeamMember[] = [
    {
      name: 'Aminata Diop',
      position: 'Fondatrice & CEO',
      image: 'assets/images/team/team1.jpg',
      social: [
        { icon: 'facebook', url: '#' },
        { icon: 'twitter', url: '#' },
        { icon: 'linkedin', url: '#' }
      ],
      delay: '100'
    },
    {
      name: 'Moussa Ndiaye',
      position: 'Responsable des Opérations',
      image: 'assets/images/team/team2.jpg',
      social: [
        { icon: 'facebook', url: '#' },
        { icon: 'twitter', url: '#' },
        { icon: 'linkedin', url: '#' }
      ],
      delay: '200'
    },
    {
      name: 'Fatou Bâ',
      position: 'Responsable Clientèle',
      image: 'assets/images/team/team3.jpg',
      social: [
        { icon: 'facebook', url: '#' },
        { icon: 'instagram', url: '#' },
        { icon: 'linkedin', url: '#' }
      ],
      delay: '300'
    }
  ];

  // Caractéristiques principales
  features: Feature[] = [
    {
      icon: 'spa',
      title: 'Produits de Qualité',
      description: 'Sélection rigoureuse des meilleurs produits pour votre beauté et bien-être.'
    },
    {
      icon: 'loyalty',
      title: 'Abonnements Flexibles',
      description: 'Des formules adaptées à vos besoins et à votre rythme de vie.'
    },
    {
      icon: 'schedule',
      title: 'Réservation en Ligne',
      description: 'Prenez rendez-vous facilement avec nos professionnels partenaires.'
    },
    {
      icon: 'support_agent',
      title: 'Support Premium',
      description: 'Une équipe dédiée pour répondre à toutes vos demandes.'
    }
  ];

  // Valeurs de l'entreprise
  values: Value[] = [
    {
      icon: 'diversity_3',
      title: 'Communauté',
      description: 'Nous bâtissons une communauté forte et solidaire autour de valeurs partagées.',
      delay: '100'
    },
    {
      icon: 'auto_awesome',
      title: 'Excellence',
      description: 'Nous visons l\'excellence dans chaque produit et service que nous proposons.',
      delay: '200'
    },
    {
      icon: 'diversity_3',
      title: 'Innovation',
      description: 'Nous repoussons les limites pour vous offrir des solutions innovantes.',
      delay: '300'
    },
    {
      icon: 'favorite',
      title: 'Passion',
      description: 'Notre passion pour la beauté et le bien-être se reflète dans tout ce que nous faisons.',
      delay: '400'
    }
  ];

  // Liens sociaux
  socialLinks = [
    { icon: 'facebook', url: 'https://www.facebook.com/' },
    { icon: 'twitter', url: 'https://twitter.com/' },
    { icon: 'linkedin', url: 'https://www.linkedin.com/' },
    { icon: 'instagram', url: 'https://www.instagram.com/' }
  ];

  description = `
  Née de la passion pour l'élégance, Dabishpro est une marque qui célèbre la beauté, la confiance et la diversité. 
  Nous avons commencé modestement avec une mission claire : offrir des produits et services qui transforment la routine en expérience de bien-être.

  Aujourd'hui, nous sommes fiers d'accompagner des milliers de femmes et d'hommes à travers le Sénégal dans leur quête de qualité et de style. 
  Nos services vont de la vente de produits de beauté à la réservation de prestations dans nos salons partenaires.

  Chez Dabishpro, chaque client est spécial. C’est pourquoi nous mettons un point d’honneur à proposer une interface intuitive, un service client réactif et des abonnements adaptés à vos besoins.

  Rejoignez notre univers où excellence, accessibilité et innovation se rencontrent pour faire rayonner votre beauté.
`;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isMobile = result.matches;
        if (!this.isMobile && this.sidenav) {
          this.sidenav.close();
        }
      });
  }

  ngOnInit() {
    console.log(this.description);
  }

  openLink(url: string) {
    window.open(url, '_blank');
  }
}
