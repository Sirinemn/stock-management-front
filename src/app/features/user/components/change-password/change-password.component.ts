import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../../auth/services/auth.service';
import { SessionService } from '../../../../core/services/session.service';
import { User } from '../../../../auth/models/user';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Subscription } from 'rxjs';
import { ChangePasswordRequest } from '../../../../auth/models/ChangePasswordRequest';

@Component({
  selector: 'app-change-password',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    MatProgressSpinner,
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  public user?: User;
  public formGroup: FormGroup;
  public errorMessage: string = '';
  public isLoading: boolean = false;
  private httpSubscription?: Subscription;

  constructor(
    private authService: AuthService,
    private sessionService: SessionService,
    private formBuiler: FormBuilder
  ) {
    this.formGroup = this.formBuiler.group({
      email: [this.user?.email, Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.user = this.sessionService.getUser();
  }
  public Submit() {
    if (this.formGroup.invalid) {
      return;
    }
    this.isLoading = true;
    this.errorMessage = '';
    const { email, newPassword, confirmPassword } = this.formGroup.value;
    if (newPassword !== confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      this.isLoading = false;
      return;
    }
    const changePasswordRequest: ChangePasswordRequest = {
      email: this.user?.email || '',
      newPassword: this.formGroup.value.newPassword,
    };
    this.httpSubscription = this.authService
      .changePassword(changePasswordRequest)
      .subscribe({
        next: () => {
          this.isLoading = false;
          alert('Password changed successfully');
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage =
            error.message || 'An error occurred while changing the password';
        },
      });
  }
  ngOnDestroy(): void {
    if (this.httpSubscription) {
      this.httpSubscription.unsubscribe();
    }
  }
}
