import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { CompagnyService } from 'src/app/services/compagny.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  registerForm: FormGroup;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  compagnies: any;

  constructor(private fb: FormBuilder, private authService: AuthService, private spinnerService: NgxSpinnerService, private router: Router, private compagnyService: CompagnyService) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }
  ngOnInit(): void {
    this.getAllCompagnies();
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    this.spinnerService.show();
    const { username, email, password, confirmPassword } = this.registerForm.value;
    this.authService.register(email, password, confirmPassword, username).subscribe((res) => {
      this.authService.login(email,password).subscribe((res) =>{
        localStorage.setItem('currentUser', JSON.stringify(res.user))
        Swal.fire({
          title: 'Création réussie',
          text: res.message,
          icon: 'success',
          showConfirmButton: false
        });
        this.spinnerService.hide();
        window.location.href= "/dashboard";
      })
    }, error => {
      this.spinnerService.hide();
      Swal.fire({
        title: 'Erreur',
        text: error.message,
        icon: 'error'
      });
      this.spinnerService.hide();
    });
  }

  getAllCompagnies(){
    this.compagnyService.getAllCompagny().subscribe(
      data => {
        this.compagnies = data;
      },
      error => {
        console.error('Error fetching companies', error);
      }
    );
  }
}
