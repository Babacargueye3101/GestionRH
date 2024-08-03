import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      Swal.fire({
        title: 'Erreur!',
        text: 'Les mots de passe ne correspondent pas.',
        icon: 'error',
        confirmButtonText: 'D\'accord'
      });
      return;
    }

    Swal.fire({
      title: 'Inscription réussie!',
      text: `Bienvenue, ${this.registerForm.value.username}!`,
      icon: 'success',
      confirmButtonText: 'D\'accord'
    });

    // Réinitialiser le formulaire
    this.registerForm.reset();
  }
}
