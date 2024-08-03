import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'GestionRH';

  @ViewChild('sidenav') sidenav!: MatSidenav;

  isOpen = false;
  sidenavTimeout: any;
  buttonTimeout: any;

  currentYear: number = new Date().getFullYear();
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
}
