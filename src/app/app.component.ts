import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from './services/auth.service';
import { CompagnyService } from './services/compagny.service';
import { Router, NavigationEnd } from '@angular/router';
import { HeaderService } from './services/header.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  userEmail: any;
  userName: any;
  title = 'GestionRH';
  currentUser: any;
  showNestedMenu = false;
  showNestedMenucandidats= false
  user:any;
  compagny:any;

  @ViewChild('sidenav') sidenav!: MatSidenav;

  isOpen = false;
  sidenavTimeout: any;
  buttonTimeout: any;

  currentYear: number = new Date().getFullYear();
  showSubCategories= false;


  isSidenavVisible: boolean = true;
  isNavbarVisible: boolean = true;

  notifications: any[] = [];
  unreadCount: number = 0;
  showNotifications: boolean = false;
  total: any;

  private headerSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private compagnyService: CompagnyService,
    private notificationService: NotificationService,
    private headerService: HeaderService
  ) {

  }
  ngOnInit(): void {
    this.headerSubscription = this.headerService.showHeader$.subscribe(show => {
      this.isNavbarVisible = show;
    });


    this.user = localStorage.getItem('currentUser');
    if (this.user) {
      this.currentUser = JSON.parse(this.user);
      this.userEmail= this.currentUser.email;
      this.userName= this.currentUser.name;
      this.isLoggedIn= true;
      this.getCurrentCompagny(this.currentUser.compagny_id);
    }

    // Filter for NavigationEnd and use type assertion
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd) // type guard
    ).subscribe((event: NavigationEnd) => {
      if (event.urlAfterRedirects.includes('public') || event.urlAfterRedirects.includes('login') || event.urlAfterRedirects.includes('register')) {
        this.isSidenavVisible = false; // Set this based on your logic
        this.isNavbarVisible = false;  // Set this based on your logic
      } else {
        this.isSidenavVisible = true;
        this.isNavbarVisible = true;
      }
    });
    this.fetchNotifications();
  }

  mouseEnterButton() {
    clearTimeout(this.buttonTimeout);
    this.sidenavTimeout = setTimeout(() => {
      this.sidenav.open();
    }, 300); // délai de 300ms
  }

  mouseLeaveButton() {
    clearTimeout(this.sidenavTimeout);
    this.buttonTimeout = setTimeout(() => {
      this.sidenav.close();
    }, 300); // délai de 300ms
  }

  mouseEnterSidenav() {
    clearTimeout(this.buttonTimeout);
  }

  mouseLeaveSidenav() {
    this.buttonTimeout = setTimeout(() => {
      this.sidenav.close();
    }, 300); // délai de 300ms
  }

  logout() {
    localStorage.removeItem('currentUser');
    window.location.href = '/login';
  }
  toggleNestedMenu() {
    this.showNestedMenu = !this.showNestedMenu;
  }
  showNestedMenuCandidat(){
    this.showNestedMenucandidats = !this.showNestedMenucandidats;
  }

  getCurrentCompagny(id:any){
    this.compagnyService.getCompagnyById(id).subscribe((res)=>{
       this.compagny= res.currentCompagny
    })
  }

  toggleSidenav() {
    this.isOpen = !this.isOpen;
  }

  toggleCategoryMenu() {
    this.showSubCategories = !this.showSubCategories;
  }

  fetchNotifications() {
    this.notificationService.getNotifications().subscribe((response) => {
      this.notifications = response.orders;
      this.total = response.total;
      console.log('Notifications:', this.notifications);
      this.unreadCount = this.notifications.filter((notification: any) => !notification.read).length;
    });
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
    if (this.showNotifications) {
      this.unreadCount = 0; // Réinitialiser le compteur lorsque les notifications sont affichées
    }
  }

  ngOnDestroy() {
    if (this.headerSubscription) {
      this.headerSubscription.unsubscribe();
    }
  }

}
