import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, map, startWith } from 'rxjs';
import { Employee } from 'src/app/models/employee.model';
import { Payment } from 'src/app/models/payment.model';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';
import { PaymentService } from 'src/app/services/payment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-payment',
  templateUrl: './create-payment.component.html',
  styleUrls: ['./create-payment.component.scss']
})
export class CreatePaymentComponent implements OnInit {
  paymentForm: FormGroup;

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
  compagny: any;
  employees: Employee[] = [];
  filteredEmployees!: Observable<Employee[]>;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeServiceService,
    private spinnerService: NgxSpinnerService,
    private paymentService: PaymentService
  ) {
    this.paymentForm = this.fb.group({
      employeeId: ['', Validators.required],
      paymentDate: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      paymentMethod: ['', Validators.required],
      referenceNumber: [''],
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadEmployees();
  }

  private _filterEmployees(value: string): Employee[] {
    const filterValue = value.toLowerCase();
    return this.employees.filter(employee =>
      employee.first_name.toLowerCase().includes(filterValue)
    );
  }


  onSubmit(): void {
    if (this.paymentForm.valid) {
      var full_name= this.paymentForm.get('employeeId')?.value
      var allemployeeNAme=this._filterEmployees(full_name.split(' ')[0]);
      const employee = allemployeeNAme[allemployeeNAme.length - 1];
      var params= {
        employee_id: employee?.id,
        payment_date: this.paymentForm.get('paymentDate')?.value,
        amount:  this.paymentForm.get('amount')?.value,
        payment_method:  this.paymentForm.get('paymentMethod')?.value,
        reference_number: this.paymentForm.get('referenceNumber')?.value,
        status: this.paymentForm.get('status')?.value,
        compagny_id: employee?.compagny_id
      }

      this.spinnerService.show();
      this.paymentService.creatPayment(params).subscribe((res) =>{
          this.spinnerService.hide();
          Swal.fire('Paiement', 'Paiment effectué avec Succés', 'success');
          this.ngOnInit();
      }, (error) =>{
          this.spinnerService.hide();
          Swal.fire('Paiement échoué', 'Paiment échoué réessayez please !!!', 'error');
      });


    }
  }



  loadEmployees(pageIndex: number = 0, pageSize: number = 100000): void {
    const user = localStorage.getItem('currentUser');

    if (user) {
      var currentUser = JSON.parse(user);
      this.compagny = currentUser.compagny_id;

      this.employeeService.getEmployees(pageIndex + 1, pageSize, this.compagny, currentUser).subscribe(
        data => {
          this.employees = data?.employees || [];
          this.filteredEmployees = this.paymentForm.get('employeeId')!.valueChanges.pipe(
            startWith(''),
            map(value => this._filterEmployees(value || ''))
          );
        },
        error => {
          console.error('Error fetching employees', error);
        }
      );
    }

  }
}
