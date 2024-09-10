import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-parametres',
  templateUrl: './parametres.component.html',
  styleUrls: ['./parametres.component.scss']
})
export class ParametresComponent implements OnInit{

  users: any[] = [];

  displayedColumns: string[] = ['name', 'canSeeDashboard', 'canSeeEmployee', 'canSeeFormation', 'canSeeCandidature', 'canSeePaies'];

  constructor(private userService: UsersService){}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  // Fonction appelée lors du changement d'état du checkbox
  onCheckboxChange(event: any, user: any, role: string): void {
    if (event.checked) {
      this.assignRole(user, role);
    } else {
      this.removeRole(user, role);
    }
  }

  // Assignation du rôle
  assignRole(user: any, role: string): void {
    user[role] = true;
    console.log(`Rôle "${role}" assigné à l'utilisateur : ${user.name}`);

    this.userService.updateRole(user.id, role, true).subscribe(response => {
      localStorage.removeItem('currentUser');
      localStorage.setItem('currentUser', JSON.stringify(response));
      console.log(response);
    });
  }

  // Suppression du rôle
  removeRole(user: any, role: string): void {
    user[role] = false;
    console.log(`Rôle "${role}" supprimé pour l'utilisateur : ${user.name}`);

    this.userService.updateRole(user.id, role, false).subscribe(response => {
      localStorage.removeItem('currentUser');
      localStorage.setItem('currentUser', JSON.stringify(response));
      console.log(response);
    });
  }


}
