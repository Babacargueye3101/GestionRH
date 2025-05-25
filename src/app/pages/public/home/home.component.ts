import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import Swiper from 'swiper';
import { HomeService } from 'src/app/services/home.service';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material/snack-bar';
import { th } from 'date-fns/locale';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isMobile = false;
  compagny = { name: 'Dabishpro' };
  currentYear = new Date().getFullYear();
  cartItemCount = 0;
  selectedCategory: any;
  filteredProducts: any[] = [];


  products : any[]=[];

  images: string[] = [
    'https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=2892&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1632210370137-4088c0e38de6?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1631510083755-11ecb5172d81?q=80&w=3090&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  ];
  categories: any;

  constructor(
    private homeService: HomeService,
    private router: Router,
    private snackBar: MatSnackBar,
    private breakpointObserver: BreakpointObserver
  ) {}

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
    // Observer pour le responsive design
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe(result => {
        this.isMobile = result.matches;
      });

    // Initialisation existante

    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize.bind(this));

    this.updateCartItemCount();
    this.homeService.getAllCategory().subscribe((response) => {
        this.categories =response;
        console.log("Liste de catégories");
        console.log(response);
    }, (error)=> {
      console.log(error);
    })

    this.homeService.getAllProduct().subscribe((respone) => {
      this.products = respone
      console.log(this.products);
      this.filteredProducts = this.products;

    }, (error) => {
      console.log(error);

    });
  }

  onCategorySelected(event: any): void {
    this.selectedCategory = event.value

    this.homeService.getProductByCategory(this.selectedCategory).subscribe((response) =>{
      this.products = response;
      this.filteredProducts = this.products;
    },(error) => {

    });
    console.log('Catégorie sélectionnée:', this.selectedCategory);
  }

  addToCart(product: any): void {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    this.updateCartItemCount();
    this.snackBar.open('Produit ajouté au panier!', 'Fermer', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['snackbar-success']
    });

  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768; // Détecte si l'écran est mobile
  }

  goToCart() {
    this.router.navigate(['/public/cart']);
  }

  makeachat(product: any){
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    this.updateCartItemCount();
    this.router.navigate(['/public/cart']);
  }

  updateCartItemCount(): void {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartItemCount = cart.length;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    console.log(filterValue);
    console.log(this.products);
    this.filteredProducts = this.products.filter((product: any) => 
    
      product.name.toLowerCase().includes(filterValue) ||
      product.description.toLowerCase().includes(filterValue)
    );
  }

}