import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { MatPaginator } from '@angular/material/paginator';
import { Employee } from 'src/app/models/employee.model';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { UploaddocumentComponent } from './uploaddocument/uploaddocument.component';
import { DetailemployeeComponent } from './detailemployee/detailemployee.component';


@Component({
  selector: 'app-employements',
  templateUrl: './employements.component.html',
  styleUrls: ['./employements.component.scss']
})
export class EmployementsComponent implements OnInit {

  filteredEmployees: any[] = [];

  employees: any []=[];
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'position', 'actions'];
  dataSource = new MatTableDataSource<Employee>();

  totalEmployees: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private employeeService: EmployeeServiceService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private spinnerService: NgxSpinnerService
  ) { }
  ngOnInit(): void {
    this.loadEmployees();
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    // Optionally, set custom labels here if needed
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
      this.loadEmployees(page, 10)
      return `${startIndex + 1} - ${endIndex} sur ${length}`;
    };
  }


  compagny=0
  loadEmployees(pageIndex: number = 0, pageSize: number = 10) {
    this.spinnerService.show()
    const user = localStorage.getItem('currentUser');

    if (user) {
      var currentUser = JSON.parse(user);
      this.compagny= currentUser.compagny_id;
    }
    this.employeeService.getEmployees(pageIndex + 1, pageSize, this.compagny).subscribe(data => {
      this.employees = data?.employees;
      this.totalEmployees = data.meta.total_count;
      this.filteredEmployees = this.employees;
      this.spinnerService.hide();
      },
      error => {
        console.error('Error fetching employees', error);
        setTimeout(() => {
          Swal.fire({
            title: 'Erreur',
            text: 'Une erreur est survenue',
            icon: 'error',
            showConfirmButton: false,
          })
        }, 1000);
        this.spinnerService.hide();
      }
    );
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      width: '800px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);

        this.employeeService.createEmployee(result).subscribe(
          (newEmployee) => {
            this.employees.push(newEmployee);
            Swal.fire('Succès', 'L\'employé a été ajouté avec succès', 'success');
          },
          (error) => {
            Swal.fire('Erreur', 'Une erreur s\'est produite lors de l\'ajout de l\'employé', 'error');
          }
        );
      }
    });
  }

  openEditDialog(employee: any): void {
    const dialogRef = this.dialog.open(EditEmployeeComponent, {
      width: '800px',
      data: employee
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeService.updateEmployee(result.id, result).subscribe(() => {
          this.loadEmployees();
        });
      }
    });

  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(
      () => {
        this._snackBar.open('Employé supprimé avec succès', 'Fermer', { duration: 3000 });
        this.loadEmployees();
      },
      error => {
        console.error('Error deleting employee', error);
      }
    );
  }


  openAddEmployeDialog(): void {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      width: '400px',
      data: { action: 'add' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadEmployees(); // Recharge la liste des employés après ajout
      }
    });
  }

  onPageChange(event: any): void {
    this.loadEmployees(event.pageIndex, event.pageSize);
  }

  openUploadDialog(employee: any): void {
    const dialogRef = this.dialog.open(UploaddocumentComponent, {
      width: '550px',
      data: { employee }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      }
    });
  }

  viewEmployeeDetails(employee: any): void {
    this.dialog.open(DetailemployeeComponent, {
      data: employee,
      width: '600px'
    });
  }

  applyFilter(event: Event) {
    const input = event.target as HTMLInputElement;
    const filterValue = input ? input.value.trim().toLowerCase() : '';
    this.filteredEmployees = this.employees.filter(employee =>
      employee.first_name.toLowerCase().includes(filterValue) ||
      employee.last_name.toLowerCase().includes(filterValue) ||
      employee.position.toLowerCase().includes(filterValue) ||
      (employee.telephone ? employee.telephone.toLowerCase().includes(filterValue) : false)
    );
  }

}
