import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RegisterAdminRequest } from '../../models/registerRequest';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';


@Component({
  selector: 'app-register',
  imports: [MatCardModule, MatDatepickerModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  public formGroup: FormGroup;
  public errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
      this.formGroup = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],  
        lastname: [  '', [Validators.required, Validators.min(4), Validators.max(20)], ],
        firstname: [  '', [Validators.required, Validators.min(4), Validators.max(20)], ],
        groupName: [  '', [Validators.required, Validators.min(4), Validators.max(20)], ],
        dateOfBirth:  ['',[Validators.required],],
        password: [ '', [Validators.required],]
      });
  }
  public Submit(): void {
    const registerRequest = this.formGroup.value as RegisterAdminRequest
    this.authService.registerAdmin(registerRequest).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        this.router.navigate(['auth/login']); 
      },
      error: (err) => {
        console.error('Registration failed:', err);
        this.errorMessage = err.error.message;
      }
    });
  }

  public back() {
    window.history.back();
  }
}
