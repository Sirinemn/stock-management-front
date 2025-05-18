import { Component, OnInit } from '@angular/core';
import { User } from '../../../auth/models/user';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionService } from '../../../core/services/session.service';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  providers: [provideNativeDateAdapter()],
  imports: [MatIconModule, MatCardModule, ReactiveFormsModule, MatFormField, MatLabel, RouterLink, MatDatepickerModule, MatFormFieldModule, MatInputModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{
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
      dateOfBirth : [null, Validators.required],
    })
  }
  ngOnInit(): void {
    this.getUser();
  }
  public getUser() {
    this.isLoading = true;
    this.sessionService.getUser$()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (user) => {
          this.user = user;
          this.userId = user?.id || 0;         
          const birthDate = user?.dateOfBirth ? new Date(user.dateOfBirth) : null;

          this.profileForm.patchValue({
            firstname: user?.firstname,
            lastname: user?.lastname,
            email: user?.email,
            dateOfBirth: birthDate,
            groupName: user?.groupName,
          });
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Une erreur est survenue';
          this.isLoading = false;
        }
      });
  }
  public onSubmit() {
  if (this.profileForm.valid && this.userId) {
    const updatedUser = {
      firstname: this.profileForm.value.firstname,
      lastname: this.profileForm.value.lastname,
      email: this.profileForm.value.email,
      dateOfBirth: this.profileForm.value.dateOfBirth
    } as User;

    this.adminService.updateUser(this.userId, updatedUser).subscribe({
      next: () => {
        this.snackBar.open('Profil mis à jour avec succès', 'Fermer', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });

        // Mise à jour du groupe séparément
        if (this.user?.groupName !== this.profileForm.value.groupName) {
          this.adminService.updateGroupName(this.userId, this.profileForm.value.groupName).subscribe({
            next: () => {
              this.snackBar.open('Groupe mis à jour avec succès', 'Fermer', {
                duration: 3000,
                panelClass: ['success-snackbar'],
              });
            },
            error: () => {
              this.snackBar.open('Erreur lors de la mise à jour du groupe', 'Fermer', {
                duration: 3000,
                panelClass: ['error-snackbar'],
              });
            }
          });
        }
      },
      error: () => {
        this.snackBar.open('Erreur lors de la mise à jour du profil', 'Fermer', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
      }
    });
  } else {
    this.snackBar.open('Veuillez corriger les erreurs dans le formulaire', 'Fermer', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }
}
  public back() {
    window.history.back();
  }  
}
