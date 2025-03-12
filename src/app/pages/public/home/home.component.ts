import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  compagny = { name: 'Votre Compagnie' };
  currentYear = new Date().getFullYear();
  cartItemCount = 0;
  images: { imageUrl: string, label: string, description: string }[] = [
    { imageUrl: '/assets/images/salon-banner.jpg', label: 'First slide label', description: 'Nulla vitae elit libero, a pharetra augue mollis interdum.' },
    { imageUrl: '/assets/images/salon-banner.jpg', label: 'Second slide label', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { imageUrl: '/assets/images/salon-banner.jpg', label: 'Third slide label', description: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.' }
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