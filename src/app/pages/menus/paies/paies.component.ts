import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatePaymentComponent } from './create-payment/create-payment.component';
import { PaymentService } from 'src/app/services/payment.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Payment } from 'src/app/models/payment.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ViewdetailPaymentComponent } from './viewdetail-payment/viewdetail-payment.component';

@Component({
  selector: 'app-paies',
  templateUrl: './paies.component.html',
  styleUrls: ['./paies.component.scss']
})
export class PaiesComponent implements OnInit {

  compagny: any;
  payments: any []=[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  displayedColumns: string[] = ['select','employeeId', 'paymentDate', 'amount', 'paymentMethod', 'referenceNumber', 'status', 'actions'];
  totalPayments= 0;

  dataSource = new MatTableDataSource<Payment>();

  employee_name:any;

  selectedPayments: any = [];



  paymentMethods = [
    { value: 'cheque', viewValue: 'Chèque' },
    { value: 'virement', viewValue: 'Virement' },
    { value: 'especes', viewValue: 'Espèces' },
    { value: 'wave', viewValue: 'Wave' },
    { value: 'om', viewValue: 'Orange Money' }
  ];
  paymentStatus = [
    { value: 'paye', viewValue: 'Payé' },
    { value: 'en_attente', viewValue: 'En attente' },
    { value: 'annule', viewValue: 'Annulé' },
    { value: 'echec', viewValue: "Echoué"}
  ];



  constructor(private dialog: MatDialog, private http: HttpClient, private paymentService: PaymentService, private spinnerService: NgxSpinnerService, private employeeService: EmployeeServiceService){

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
      this.paymentService.getAllpayment(pageIndex, pageSize, this.compagny, currentUser).subscribe((res)=>{
        this.spinnerService.hide();
        this.payments= res?.payments
        this.totalPayments= this.payments?.length;

      }, (error) =>{
        console.log(error);
          this.spinnerService.hide();
      });
    }

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

  getPaymentStatusViewValue(value: string): string | undefined {
    const item = this.paymentStatus.find(el => el.value === value);
    return item ? item.viewValue : undefined;
  }


  toggleSelection(payment: any) {
    const index = this.selectedPayments.indexOf(payment);
    if (index === -1) {
      this.selectedPayments.push(payment);
    } else {
      this.selectedPayments.splice(index, 1);
    }
  }

  selectAll(event: MatCheckboxChange) {
    if (event.checked) {
      this.selectedPayments = [...this.payments];
    } else {
      this.selectedPayments = [];
    }
  }

  isAllSelected() {
    return this.payments?.length > 0 && this.selectedPayments?.length === this.payments?.length;
  }

  isSomeSelected() {
    return this.selectedPayments?.length > 0 && !this.isAllSelected();
  }

  ValiderSelectedPayments() {

    Swal.fire({
      title: 'Validation',
      text: 'Voulez-vous valider les Paiements selectionnés',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
    }).then((result) => {
      if (result.isConfirmed) {
        // Code à exécuter si l'utilisateur clique sur "Oui"
        console.log('Utilisateur a cliqué Oui');
      } else if (result.isDismissed) {
        // Code à exécuter si l'utilisateur clique sur "Non"
        console.log('Utilisateur a cliqué Non');
      }
    });

    console.log(this.selectedPayments);

  }

  exportToExcel() {
    throw new Error('Method not implemented.');
  }

  exportToCSV() {
    throw new Error('Method not implemented.');
  }


  deletePayment(arg0: any) {
    throw new Error('Method not implemented.');
  }

  editPayment(arg0: any) {
    throw new Error('Method not implemented.');
  }

  viewPayment(payment: any) {
    this.dialog.open(ViewdetailPaymentComponent, {
      data: payment,
      width: '700px',
      height: '500px'
    });
  }


  downloadPayments() {
    const compagnyId = 7; // Remplacez par l'ID de Dabishpro

    this.paymentService.downloadCSV(compagnyId).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `payments-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('Erreur lors du téléchargement du CSV', error);
    });
  }

  downloadPdf(): void {
    this.paymentService.downloadPaymentsPdf(this.compagny).subscribe(
      (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `payments-${new Date().toISOString().slice(0, 10)}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error => {
        console.error('Error downloading PDF', error);
      }
    );
  }


  generateInvoice(employeeId: number, id: number): void {
    this.paymentService.downloadSignlePaymentsPdf(this.compagny, employeeId, id).subscribe(
      (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `facture-${employeeId}-invoice-${new Date().toISOString().slice(0, 10)}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error => {
        console.error('Error generating invoice', error);
      }
    );
  }

  downloadSinglePaymentPdf(paymentId: number): void {
    const compagnyId = this.compagny; // Récupérer l'ID de la compagnie
    this.paymentService.downloadSinglePaymentPdf(compagnyId, paymentId).subscribe(
      (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `facture-${paymentId}-${new Date().toISOString().slice(0, 10)}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error => {
        console.error('Error downloading PDF', error);
      }
    );
  }







}
