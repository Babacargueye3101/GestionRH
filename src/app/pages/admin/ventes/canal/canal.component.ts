import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CanalService } from 'src/app/services/canal.service';

@Component({
  selector: 'app-canal',
  templateUrl: './canal.component.html',
  styleUrls: ['./canal.component.scss']
})
export class CanalComponent {


  channelForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private canalService: CanalService,
    private dialogRef: MatDialogRef<CanalComponent>
  ) {
    // Création du formulaire
    this.channelForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {}

  // Méthode pour ajouter un channel
  addChannel(): void {
    if (this.channelForm.valid) {
      const channelData = this.channelForm.value;

      this.canalService.addChannel(channelData).subscribe(
        () => {
          this.channelForm.reset(); // Réinitialiser le formulaire
          this.canalService.showSuccessAlert(); // Afficher une alerte de succès
        },
        (error) => {
          console.error('Erreur lors de la création du channel', error);
          this.canalService.showErrorAlert(); // Afficher une alerte d'erreur
        }
      );
    }
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
