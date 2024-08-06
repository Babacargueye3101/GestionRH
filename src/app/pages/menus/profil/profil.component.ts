import { Component } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent {

  user = {
    name: 'John Doe',
    position: 'Software Engineer',
    email: 'john.doe@example.com',
    phone: '+123456789',
    address: '123 Main St, City, Country'
  };

}
