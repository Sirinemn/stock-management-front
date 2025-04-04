import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/loginRequest';

@Component({
  selector: 'app-login',
  imports: [MatCardModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  public errorMessage: string = '';

  public formGroup:FormGroup ;
  constructor(private formbuilder: FormBuilder,
    private authService: AuthService,
  ) {
    // Initialize the form group with controls for username and password
    this.formGroup = this.formbuilder.group({
      email: [ '', Validators.required],
      password: [ '', Validators.required]
    });
  }

  public Submit() {
    if (this.formGroup.valid) {
      const loginRequest = this.formGroup.value as LoginRequest
      this.authService.login(loginRequest).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          // Handle successful login, e.g., navigate to a different page or store user data
        },
        error: (err) => {
          console.error('Login failed:', err);
          this.errorMessage = err.error.message;
        }
      });
    }
  }
  public goToRegister() {
    throw new Error('Method not implemented.');
  }

}
