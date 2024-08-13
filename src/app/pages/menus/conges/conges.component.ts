import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DemandecongesComponent } from './demandeconges/demandeconges.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CongesService } from 'src/app/services/conges.service';
import { MatPaginator } from '@angular/material/paginator';
import { Conge } from 'src/app/models/conge.model';
import { MatTableDataSource } from '@angular/material/table';
import { ValidercongeComponent } from './validerconge/validerconge.component';

@Component({
  selector: 'app-conges',
  templateUrl: './conges.component.html',
  styleUrls: ['./conges.component.scss']
})
export class CongesComponent implements OnInit{

  addConges!: FormGroup;
  conge_id: any;

  totalConges!: number;

  displayedColumns: string[] = ['leave_type', 'start_date', 'end_date', 'days_taken','status', 'actions'];
  congeList = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<Conge>();

  currentUser:any;


  leaveTypes = [
    { value: 'paid', viewValue: 'Congés Payés' },
    { value: 'sick', viewValue: 'Congés Maladie' },
    { value: 'unpaid', viewValue: 'Congés Sans Solde' },
    { value: 'parental', viewValue: 'Congés Parentaux' },
    { value: 'sabbatical', viewValue: 'Congés Sabbatiques' },
    { value: 'annual', viewValue: 'Congés Annuels' },
    { value: 'child_sick', viewValue: 'Congés pour Enfants Malades' },
    { value: 'training', viewValue: 'Congés de Formation' },
    { value: 'family', viewValue: 'Congés pour Raisons Familiales' },
    { value: 'volunteer', viewValue: 'Congés pour Volontariat' },
    { value: 'recovery', viewValue: 'Congés de Récupération' },
    { value: 'travel', viewValue: 'Congés pour Voyage' }
  ];


  leaveStatuses = [
    { value: 'en_attente', viewValue: 'En Attente' },
    { value: 'approuve', viewValue: 'Approuvé' },
    { value: 'refuse', viewValue: 'Refusé' },
    { value: 'termine', viewValue: 'Terminé' }
  ];
  user: any;



  constructor(private dialog: MatDialog , private congeservice: CongesService)
  {

  }

  ngOnInit(): void {
    this.user = localStorage.getItem('currentUser');
    if (this.user) {
      this.currentUser = JSON.parse(this.user);
    }
    this.getConges(0, 10, this.currentUser);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Éléments par page:';
    this.paginator._intl.nextPageLabel = 'Page suivante';
    this.paginator._intl.previousPageLabel = 'Page précédente';
    this.paginator._intl.lastPageLabel = 'Derniére page';
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length === 0 || pageSize === 0) {
        return `0 sur ${length}`;
      }
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
      this.getConges(page, 10, this.currentUser)
      return `${startIndex + 1} - ${endIndex} sur ${length}`;
    };
  }

  onPageChange(event: any): void {
    this.getConges(event.pageIndex, event.pageSize, this.currentUser);
  }

  demandeConges() {
    this.dialog.open(DemandecongesComponent, {
      width: '950px',
      height: '630px',
    });
  }

  getConges(pageIndex: number = 0, pageSize: number = 10, currentUser: any): void {
    this.congeservice.getCongesList(pageIndex + 1,pageSize, currentUser).subscribe(
      (response: any) => {
        this.congeList = response?.conges;
        this.totalConges=  response?.meta.total_count;
      },
      error => {
        console.error('Erreur lors du chargement des demandes de congés', error);
      }
    );
  }

  editConge(conge: any): void {
    // Logic to edit the leave request
  }

  deleteConge(conge: any): void {
    // Logic to delete the leave request
  }

  validerConge(conge: any){
    this.dialog.open(ValidercongeComponent, {
       width: '500px',
       height: '500px',
       data: { conge }
    });
  }


  getLeaveViewValue(leaveValue: string): string | undefined {
    const leaveType = this.leaveTypes.find(leave => leave.value === leaveValue);
    return leaveType ? leaveType.viewValue : undefined;
  }

  getLeaveStatusViewValue(statusValue: string): string | undefined {
    const status = this.leaveStatuses.find(s => s.value === statusValue);
    return status ? status.viewValue : undefined;
  }


  // GET STATUS BADGE
  getStatusColorClass(status: string): string {
    let statusClass = '';
    switch (status) {
      case 'en_attente':
        statusClass = 'status-pending';
        break;
      case 'approuve':
        statusClass = 'status-approved';
        break;
      case 'refuse':
        statusClass = 'status-rejected';
        break;
      default:
        statusClass = 'status-termine';
    }
    return statusClass;
  }

}
