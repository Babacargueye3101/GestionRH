import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CompagnymodalComponent } from './compagnymodal/compagnymodal.component';
import { CompagnyService } from 'src/app/services/compagny.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { DetailCompagnyComponent } from './detail-compagny/detail-compagny.component';
import { EditCompagnyComponent } from './edit-compagny/edit-compagny.component';

export interface Company {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-compagny',
  templateUrl: './compagny.component.html',
  styleUrls: ['./compagny.component.scss']
})
export class CompagnyComponent implements OnInit{

  companies: any;
  searchCriteria = {
    name: '',
    state: '',
    city: ''
  };

  constructor(private dialog: MatDialog, private compagnyService: CompagnyService, private spinnerService: NgxSpinnerService){

  }
  ngOnInit(): void {
    this._fetchData();
  }
  displayedColumns: string[] = ['name', 'address','city','countrie','phoneNumber','email', 'actions'];

  searchCompany(): void {
    this.companies = this.companies?.filter((company: any) => {
      return (!this.searchCriteria.name || company.name.toLowerCase().includes(this.searchCriteria.name.toLowerCase())) &&
             (!this.searchCriteria.state || company.state.toLowerCase().includes(this.searchCriteria.state.toLowerCase())) &&
             (!this.searchCriteria.city || company.city.toLowerCase().includes(this.searchCriteria.city.toLowerCase()));
    });
  }

  resetSearch(): void {
    this.searchCriteria = {
      name: '',
      state: '',
      city: ''
    };
    this.companies = [...this.companies];
    this.ngOnInit();
  }


  deleteCompany(id: number): void {
    // Logique pour supprimer une compagnie
    console.log('Supprimer la compagnie', id);
  }


  editCompagny(compagny: any){
    const dialogRef=this.dialog.open(EditCompagnyComponent, {
      data: compagny,
      width: '900px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.compagnyService.updateCompagny(result.id, result).subscribe(() => {
          this._fetchData();
        });
      }
    });
  }


  openCreateCompanyModal(): void {
    this.dialog.open(CompagnymodalComponent, {
      width: '950px',
      height: '630px'
    });
  }

  viewCompany(compagny: any): void {
    this.dialog.open(DetailCompagnyComponent, {
      data: compagny,
      width: '900px'
    });
  }


  _fetchData(){
    this.spinnerService.show();
    this.compagnyService.getAllCompagny().subscribe(
      data => {
        this.companies = data;
        this.spinnerService.hide();
      },
      error => {
        console.error('Error fetching companies', error);
        Swal.fire({
          title: 'Erreur',
          text: 'Erreur de Connexion',
          icon: "error"
        });
        this.spinnerService.hide();
      }
    );
  }



}
