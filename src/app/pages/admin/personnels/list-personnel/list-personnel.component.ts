import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetailPersonnelComponent } from '../detail-personnel/detail-personnel.component';
import Swal from 'sweetalert2';
import { UpdatePersonnelComponent } from '../update-personnel/update-personnel.component';
import { PersonnelService } from 'src/app/services/personnels/personnel.service';
import { response } from 'express';

@Component({
  selector: 'app-list-personnel',
  templateUrl: './list-personnel.component.html',
  styleUrls: ['./list-personnel.component.scss']
})
export class ListPersonnelComponent {

  @Input() personnels: any[] = [];
  filteredPersonnels: any[] = [];
  displayedColumns: string[] = ['nom', 'prenom', 'email', 'phone', 'actions'];

  constructor(public dialog: MatDialog, private personnelService: PersonnelService) {}

  ngOnInit(): void {
    this.loadPersonnels();
  }

  loadPersonnels(): void {
    this.personnelService.getPersonnels().subscribe(data => {
      this.personnels = data;
      this.filteredPersonnels = data; // Initialisation des données filtrées
    });
  }
  // Ouvrir le dialogue de détail du personnel
  openDetailDialog(personnel: any) {
    this.dialog.open(DetailPersonnelComponent, {
      width: '600px',
      data: personnel
    });
  }

  // Ouvrir le dialogue d'édition du personnel
  openEditDialog(personnel: any) {
    const dialogRef = this.dialog.open(UpdatePersonnelComponent, {
      width: '600px',
      data: personnel
    });

    dialogRef.afterClosed().subscribe(updatedPersonnel => {
      if (updatedPersonnel) {
        const index = this.personnels.findIndex(p => p.id === updatedPersonnel.id);
        if (index > -1) {
          this.personnels[index] = updatedPersonnel; // Mettre à jour la liste avec le personnel modifié
        }
      }
    });
  }

  // Supprimer un personnel avec SweetAlert2
  deletePersonnel(personnel: any) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: `Vous êtes sur le point de supprimer ${personnel.first_name} ${personnel.last_name}. Cette action est irréversible.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        // Supprimer le personnel de la liste
        this.personnels = this.personnels.filter(p => p.id !== personnel.id);

        this.personnelService.deletePersonnel(personnel.id).subscribe((response) => {

          Swal.fire(
            'Supprimé!',
            `${personnel.first_name} ${personnel.last_name} a été supprimé.`,
            'success'
          );
        }, (error) => {
          Swal.fire(
            'La suppression',
            `${personnel.first_name} ${personnel.last_name} a échoué`,
            'error'
          );
        })


      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    this.filteredPersonnels = this.personnels.filter(personnel => 
      personnel.last_name.toLowerCase().includes(filterValue) ||
      personnel.first_name.toLowerCase().includes(filterValue) ||
      personnel.email.toLowerCase().includes(filterValue) ||
      personnel.phone.toLowerCase().includes(filterValue)
    );
  }
}
