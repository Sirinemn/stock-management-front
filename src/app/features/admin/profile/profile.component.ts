import { Component, OnInit } from '@angular/core';
import { User } from '../../../auth/models/user';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{
  public user!: User | null ;
  public userId: number = 0;
  public errorMessage: string = '';
  private destroy$ = new Subject<void>();
  public isLoading: boolean = false;
  public fb!: FormGroup;

  constructor(
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { 
    this.fb = this.formBuilder.group({
      firstName: [''],  
      lastName: [''],
      email: [''],
      password : [''],
    })
  }
  ngOnInit(): void {
    this.getUser();
  }
  public getUser() {
    this.authService.getAuthenticatedUser().pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        this.user = response;
        this.userId = response.id;
      },
      error: (error) => {
        this.errorMessage = error.error.message;
      }
    });
  }
  
}
