import { CommonModule, NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  imports: [MatCardModule, ReactiveFormsModule, MatFormFieldModule, MatProgressSpinnerModule, NgClass, CommonModule, MatInputModule, MatOptionModule, MatSelectModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  public formGroup: FormGroup;
  public isLoading: boolean = false;
  public errorMessage: string ="";
  public  subjectOptions: string[] = [
    'Support Technique',
    'Problème de Facturation',
    'Demande de Fonctionnalité',
    'Autre'
  ];

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      subject:['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }
  submitForm() {
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.snackBar.open('Message envoyé avec succès ! On vous répondra au plus vite', 'Fermer', {duration: 3000})
    } else {
      this.errorMessage = "Veuillez remplir tous les champs correctement.";
    }
  }
}

