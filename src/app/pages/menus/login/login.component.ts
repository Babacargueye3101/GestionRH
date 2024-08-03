import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  hide = true; // Pour masquer le mot de passe

  constructor(private fb: FormBuilder, private spinner: NgxSpinnerService, private authService: AuthService, private router: Router) {
    // Initialisation du formulaire
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }



  onSubmit() {
    if (this.loginForm.valid) {
      let email= this.loginForm.get('email')?.value;
      let password= this.loginForm.get('password')?.value
      this.spinner.show();
      this.authService.login(email, password).subscribe(
        response => {
          console.log('Login successful', response);
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          this.spinner.hide();
          setTimeout(() => {
            Swal.fire({
              title: 'Success',
              text: 'Connexion réussie avec succès.',
              icon: 'success',
              showConfirmButton: false,
            }).then(() => {
              window.location.href = '/dashboard';
            });
          }, 2000);
        },
        error => {
          this.spinner.hide();
          Swal.fire({
            title: 'Erreur',
            text: 'Erreur de Connexion',
            icon: "error"
          });
          console.error('Login failed', error);
        }
      );
      // Ajoutez ici la logique de connexion
    }
  }

}
