import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  private apiUrl = environment.apiEmployee

  constructor(private http: HttpClient) { }




  getEmployees(page: number = 1, perPage: number = 10, compagny_id: number): Observable<any> {
    const params = {
      page: page.toString(),
      per_page: perPage.toString(),
      compagny_id: compagny_id
    };
    return this.http.get<Employee[]>(this.apiUrl, { headers: this.getHeaders(), params });
  }

  getAll(compagny_id: number): Observable<any> {
    return this.http.get<Employee[]>(`${this.apiUrl}/${compagny_id}/getAll`, { headers: this.getHeaders() });
  }


  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee, { headers: this.getHeaders() });
  }

  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${id}`, employee, { headers: this.getHeaders() });
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }
}
