import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {


  currentUser: any;

  ngOnInit(): void {
    const user = localStorage.getItem('currentUser');

    if (user) {
      this.currentUser = JSON.parse(user);
    }
  }

}
