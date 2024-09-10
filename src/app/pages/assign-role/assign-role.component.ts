import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-assign-role',
  templateUrl: './assign-role.component.html',
  styleUrls: ['./assign-role.component.scss']
})
export class AssignRoleComponent implements OnInit {

  users: any[] = [];
  selectedUsers: number[] = [];


  constructor(private userService: UsersService, public dialogRef: MatDialogRef<AssignRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){}

  ngOnInit(): void {
    this.loadUsers();
  }



  loadUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  // Annuler et fermer le modal
  onNoClick(): void {
    this.dialogRef.close();
  }

  // Assigner les utilisateurs sélectionnés et fermer le modal
  assign(): void {
    console.log(`Rôle à assigner : ${this.data.role}`);
    console.log('Utilisateurs assignés :', this.selectedUsers);
    this.dialogRef.close({ role: this.data.role, users: this.selectedUsers });  // Renvoi des données
  }
}
