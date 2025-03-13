import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import Swiper from 'swiper';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  compagny = { name: 'Votre Compagnie' };
  currentYear = new Date().getFullYear();
  cartItemCount = 0;

  images: string[] = [
    'https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=2892&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1632210370137-4088c0e38de6?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1631510083755-11ecb5172d81?q=80&w=3090&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  ];
  categories = [
    { name: 'Catégorie 1', imageUrl: '/assets/category1.jpg' },
    { name: 'Catégorie 2', imageUrl: '/assets/category2.jpg' },
    // Ajoutez d'autres catégories ici
  ];
  products = [
    {
      id: '1',
      image: 'https://res.cloudinary.com/deunyl3k1/image/upload/s--TmKq6IWK--/c_fill,f_auto,h_650,q_auto,w_800/v1/cor/default/0001/54/62532397009322a52449bbdbdcabd489457b7d76.png',
      title: 'Trainers',
      subtitle: 'Trainers in white',
      price: '$80',
      rating: '4.6',
      status: 'New'
    },
    {
      id: '2',
      image: 'https://res.cloudinary.com/deunyl3k1/image/upload/s--TmKq6IWK--/c_fill,f_auto,h_650,q_auto,w_800/v1/cor/default/0001/54/62532397009322a52449bbdbdcabd489457b7d76.png',
      title: 'Boots',
      subtitle: 'Trainers in blue',
      price: '$37',
      rating: '4.6',
      status: 'Sale'
    },
    {
      id: '3',
      image: 'https://res.cloudinary.com/deunyl3k1/image/upload/s--TmKq6IWK--/c_fill,f_auto,h_650,q_auto,w_800/v1/cor/default/0001/54/62532397009322a52449bbdbdcabd489457b7d76.png',
      title: 'Flat sandals',
      subtitle: 'Trainers in white',
      price: '$70',
      rating: '4.6',
      status: 'New'
    },
    {
      id: '4',
      image: 'https://res.cloudinary.com/deunyl3k1/image/upload/s--TmKq6IWK--/c_fill,f_auto,h_650,q_auto,w_800/v1/cor/default/0001/54/62532397009322a52449bbdbdcabd489457b7d76.png',
      title: 'Trainers',
      subtitle: 'Trainers in blue',
      price: '$85',
      rating: '4.6',
      status: 'Sale'
    },
    {
      id: '5',
      image: 'https://res.cloudinary.com/deunyl3k1/image/upload/s--TmKq6IWK--/c_fill,f_auto,h_650,q_auto,w_800/v1/cor/default/0001/54/62532397009322a52449bbdbdcabd489457b7d76.png',
      title: 'Trainers',
      subtitle: 'Trainers in blue',
      price: '$85',
      rating: '4.6',
      status: 'Sale'
    },
    {
      id: '6',
      image: 'https://res.cloudinary.com/deunyl3k1/image/upload/s--TmKq6IWK--/c_fill,f_auto,h_650,q_auto,w_800/v1/cor/default/0001/54/62532397009322a52449bbdbdcabd489457b7d76.png',
      title: 'Trainers',
      subtitle: 'Trainers in blue',
      price: '$85',
      rating: '4.6',
      status: 'Sale'
    },
    {
      id: '7',
      image: 'https://res.cloudinary.com/deunyl3k1/image/upload/s--TmKq6IWK--/c_fill,f_auto,h_650,q_auto,w_800/v1/cor/default/0001/54/62532397009322a52449bbdbdcabd489457b7d76.png',
      title: 'Trainers',
      subtitle: 'Trainers in blue',
      price: '$85',
      rating: '4.6',
      status: 'Sale'
    },
    {
      id: '8',
      image: 'https://res.cloudinary.com/deunyl3k1/image/upload/s--TmKq6IWK--/c_fill,f_auto,h_650,q_auto,w_800/v1/cor/default/0001/54/62532397009322a52449bbdbdcabd489457b7d76.png',
      title: 'Trainers',
      subtitle: 'Trainers in blue',
      price: '$85',
      rating: '4.6',
      status: 'Sale'
    }
  ];

  constructor() {}

  ngAfterViewInit(): void {
    new Swiper('.swiper-container', {
      modules: [Autoplay, Navigation, Pagination],
      loop: true,
      autoplay: {
        delay: 3000, // Change d'image toutes les 3 secondes
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    });
  }

  ngOnInit(): void {

    this.updateCartItemCount();
  }

  addToCart(product: any): void {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    this.updateCartItemCount();
    console.log('Produit ajouté au panier:', product);
  }

  updateCartItemCount(): void {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartItemCount = cart.length;
  }
}