import { Component, OnInit } from '@angular/core';
import { User } from '../../../auth/models/user';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionService } from '../../../core/services/session.service';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatError, MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-profile',
  providers: [provideNativeDateAdapter()],
  imports: [MatIconModule, MatCardModule, ReactiveFormsModule, MatFormField, MatLabel, RouterLink, MatDatepickerModule, MatFormFieldModule, MatInputModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{
onSubmit() {
throw new Error('Method not implemented.');
}
  public user!: User | null ;
  public userId: number = 0;
  public errorMessage: string = '';
  private destroy$ = new Subject<void>();
  public isLoading: boolean = false;
  public profileForm!: FormGroup;

  constructor(
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    private sessionService: SessionService,
    private snackBar: MatSnackBar,
  ) { 
    this.profileForm = this.formBuilder.group({
      lastname: [  '', [Validators.required, Validators.min(4), Validators.max(20)], ],
      firstname: [  '', [Validators.required, Validators.min(4), Validators.max(20)], ],
      groupName: [  '', [Validators.required, Validators.min(4), Validators.max(20)], ],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth : ['', Validators.required],
    })
  }
  ngOnInit(): void {
    this.getUser();
  }
  public getUser() {
    this.isLoading = true;
    this.sessionService.getUser$().subscribe({
      next: (user) => {
        this.user = user;
        this.userId = user?.id || 0;
        this.profileForm.patchValue({
          firstname: user?.firstname,
          lastname: user?.lastname,
          email: user?.email,
          dateOfBirth: user?.dateOfBirth ? new Date(user.dateOfBirth) : null,
          groupName: user?.groupName,
        });
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error;
        this.isLoading = false;
      }
    });
  }
  public back() {
    window.history.back();
  }  
}
