import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';

@Component({
  selector: 'app-viewdetail-payment',
  templateUrl: './viewdetail-payment.component.html',
  styleUrls: ['./viewdetail-payment.component.scss']
})
export class ViewdetailPaymentComponent implements OnInit {

  employee_name: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private employeeService: EmployeeServiceService) {
    console.log(data);

  }
  ngOnInit(): void {
    this.getEmployeById(this.data.employee_id)
  }


  getEmployeById(id: number){
    this.employeeService.getEmployee(id).subscribe( (res)=> {
      this.employee_name= res
    }, (error)=>{
      console.log(error);
    });
 }

}
