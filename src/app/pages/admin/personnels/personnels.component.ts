import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatePersonnelComponent } from './create-personnel/create-personnel.component';
import { PersonnelService } from 'src/app/services/personnels/personnel.service';

@Component({
  selector: 'app-personnels',
  templateUrl: './personnels.component.html',
  styleUrls: ['./personnels.component.scss']
})
export class PersonnelsComponent implements OnInit{

  personnels: any[] = [];

  constructor(private dialog: MatDialog, private personnelService: PersonnelService) {}

  ngOnInit(): void {
    this.loadPersonnels();
  }

  loadPersonnels() {
    this.personnelService.getPersonnels().subscribe({
      next: (data) => {
        console.log('Personnels:', data);
        this.personnels = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des personnels:', err);
      }
    });
  }
  openCreatePersonnelModal() {
    const dialogRef = this.dialog.open(CreatePersonnelComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Vente créée avec succès', result);
      }
    });
  }

}
