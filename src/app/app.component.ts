import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { CompagnyService } from './services/compagny.service';

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
  showNestedMenu = false;
  showNestedMenucandidats= false
  user:any;
  compagny:any;

  @ViewChild('sidenav') sidenav!: MatSidenav;

  isOpen = false;
  sidenavTimeout: any;
  buttonTimeout: any;

  currentYear: number = new Date().getFullYear();

  constructor(private authService: AuthService, private router: Router, private compagnyService: CompagnyService){

  }
  ngOnInit(): void {

    this.user = localStorage.getItem('currentUser');
    if (this.user) {
      this.currentUser = JSON.parse(this.user);
      this.userEmail= this.currentUser.email;
      this.userName= this.currentUser.name;
      this.isLoggedIn= true;
      this.getCurrentCompagny(this.currentUser.compagny_id);
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

}
