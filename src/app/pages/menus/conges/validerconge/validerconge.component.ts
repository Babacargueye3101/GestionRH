import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { CongesService } from 'src/app/services/conges.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-validerconge',
  templateUrl: './validerconge.component.html',
  styleUrls: ['./validerconge.component.scss']
})
export class ValidercongeComponent {

  selectedStatus!: string;
  comment!: string;

  leaveStatuses = [
    { value: 'en_attente', viewValue: 'En Attente' },
    { value: 'approuve', viewValue: 'Approuvé' },
    { value: 'refuse', viewValue: 'Refusé' },
    { value: 'termine', viewValue: 'Terminé' }
  ];

  constructor(public dialogRef: MatDialogRef<ValidercongeComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private congeService: CongesService, private spinnerService: NgxSpinnerService){
    this.selectedStatus= data.conge.status;
    this.comment= data.conge.comment;
  }


  changerStatus() {
    this.spinnerService.show();
    console.log(this.data);

    const congeNom = this.data.conge.full_name; // Récupérez le nom du congé
    const day_taken= this.data.conge.days_taken
    const message = `Bonjour "${congeNom}", votre congé de "${day_taken} jours " a été approuvé. Bon congé !!!`;
    this.congeService.changeStatusConge(this.data.conge.id, this.selectedStatus, this.comment).subscribe((res)=> {
      this.congeService.sendMessageToUser("18233", "221775857181", message)
        .subscribe(
          (res) => {
            console.log("############# WAAPI TEST");
            console.log(res);  // Affiche la réponse de l'API en cas de succès
          },
          (error) => {
            console.log(error);  // Affiche l'erreur en cas d'échec
          }
      );
      Swal.fire('Status Changé avec Success', 'Success', 'success').then((result) => {
        if (result.isConfirmed) {
          location.reload();
          this.spinnerService.hide();
        }
      });
      },(error)=>{
        Swal.fire('Echec du Changement', 'Erreur', 'error');
        this.spinnerService.hide();
      })
  }



}
