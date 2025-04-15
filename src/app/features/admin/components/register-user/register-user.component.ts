import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../../auth/services/auth.service';
import { RegisterUserRequest } from '../../../../auth/models/registerUserRequest';

@Component({
  selector: 'app-register-user',
  providers: [provideNativeDateAdapter()],
  imports: [MatProgressSpinnerModule ,MatCardModule, MatDatepickerModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, NgIf],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.scss'
})
export class RegisterUserComponent {
  public formGroup: FormGroup;
  public errorMessage: string = '';
  public messageResponse: string = '';
  private subscription: Subscription = new Subscription();
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: RouterLink,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],  
      lastname: [  '', [Validators.required, Validators.min(4), Validators.max(20)], ],
      firstname: [  '', [Validators.required, Validators.min(4), Validators.max(20)], ],
      dateOfBirth:  ['',[Validators.required],],
      password: [ '', [Validators.required],]
    });
  }

  public Submit(): void {
    if (this.formGroup.valid) {
      this.isLoading = true; 
      const registerUser = this.formGroup.value as RegisterUserRequest
      this.subscription = this.authService.registerUser(registerUser).subscribe({
        next: (response) => {
          this.isLoading = false; 
          this.messageResponse = response.message;
          const snackBarRef = this.snackBar.open(this.messageResponse, 'Fermer', {
            duration: 3000,
          });
          snackBarRef.afterDismissed().subscribe(() => {
            this.formGroup.reset();
          });
        },
        error: (error) => {
          this.isLoading = false; 
          this.errorMessage = error.error.message;
        }
      });
    }
  }
  public back() {
    window.history.back();
  }

}
