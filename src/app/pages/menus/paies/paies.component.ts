import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatePaymentComponent } from './create-payment/create-payment.component';
import { PaymentService } from 'src/app/services/payment.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Payment } from 'src/app/models/payment.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';

@Component({
  selector: 'app-paies',
  templateUrl: './paies.component.html',
  styleUrls: ['./paies.component.scss']
})
export class PaiesComponent implements OnInit {
  compagny: any;
  payments: any []=[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  displayedColumns: string[] = ['employeeId', 'paymentDate', 'amount', 'paymentMethod', 'referenceNumber', 'status'];
  totalPayments= 0;

  dataSource = new MatTableDataSource<Payment>();

  employee_name:any;



  constructor(private dialog: MatDialog, private paymentService: PaymentService, private spinnerService: NgxSpinnerService, private employeeService: EmployeeServiceService){

  }

  ngOnInit(): void {
    this.getAllPayment();
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
      this.getAllPayment(page, 10)
      return `${startIndex + 1} - ${endIndex} sur ${length}`;
    };
  }

  getAllPayment(pageIndex: number = 0, pageSize: number = 10){

    this.spinnerService.show()
    const user = localStorage.getItem('currentUser');

    if (user) {
      var currentUser = JSON.parse(user);
      this.compagny= currentUser.compagny_id;
    }
    this.paymentService.getAllpayment(pageIndex, pageSize, this.compagny).subscribe((res)=>{
      this.spinnerService.hide();
      this.payments= res?.payments
      this.totalPayments= this.payments.length;

    }, (error) =>{
      console.log(error);
        this.spinnerService.hide();
    });

  }

  getEmployeById(id: number){
     this.employeeService.getEmployee(id).subscribe( (res)=> {
       this.employee_name= res
       console.log(this.employee_name);

     }, (error)=>{
       console.log(error);

     });
  }


  creeNewPayment() {
    this.dialog.open(CreatePaymentComponent, {
      width: '650px',
      height: '630px',
    });
  }

}
