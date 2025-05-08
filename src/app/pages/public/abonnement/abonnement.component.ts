import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AbonnementPublicService } from 'src/app/services/public/abonnement-public.service';
import Swal from 'sweetalert2';
import { SouscriptionAbonnementComponent } from './souscription-abonnement/souscription-abonnement.component';

@Component({
  selector: 'app-abonnement',
  templateUrl: './abonnement.component.html',
  styleUrls: ['./abonnement.component.scss']
})
export class AbonnementComponent implements OnInit{

  currentYear: number = new Date().getFullYear();
  abonnementList :any ;
  compagny = { name: 'Dabishpro' };
  constructor(private abonnementServcie: AbonnementPublicService, private dialog: MatDialog){

  }

  ngOnInit(): void {
    this.getAlllAbonnement();
  }

  detailAbonnementRedirect(abonnement: any) {

    this.dialog.open(SouscriptionAbonnementComponent, {
      data: abonnement,
      width: '600px'
    });
  }

  getAlllAbonnement(){
    this.abonnementServcie.getAlllAbonnement().subscribe((response) => {
      this.abonnementList =response;
    }, (error) => {
      console.log(error);
    });
  }

}
