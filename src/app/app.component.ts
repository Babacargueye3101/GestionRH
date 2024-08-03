import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean = false;
  userEmail: any;
  userName: any;
  title = 'GestionRH';
  currentUser: any;

  @ViewChild('sidenav') sidenav!: MatSidenav;

  isOpen = false;
  sidenavTimeout: any;
  buttonTimeout: any;

  currentYear: number = new Date().getFullYear();

  constructor(private authService: AuthService, private router: Router){

  }
  ngOnInit(): void {

    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUser = JSON.parse(user);
      this.userEmail= this.currentUser.email;
      this.userName= this.currentUser.name;
      this.isLoggedIn= true;
      console.log(this.userEmail);
    }
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
}
