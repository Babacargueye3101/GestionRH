import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  hide = true; // Pour masquer le mot de passe

  constructor(private fb: FormBuilder, private spinner: NgxSpinnerService) {
    // Initialisation du formulaire
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }



  onSubmit() {
    if (this.loginForm.valid) {
      this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
        Swal.fire({
          title: 'Alerte!',
          text: 'Ceci est un test de SweetAlert2.',
          icon: 'success'
        });
      }, 2000);
      console.log('Form submitted', this.loginForm.value);

      // Ajoutez ici la logique de connexion
    }
  }

}
