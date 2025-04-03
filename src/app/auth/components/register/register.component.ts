import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RegisterAdminRequest } from '../../models/registerRequest';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  public formGroup: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
      this.formGroup = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],  
        lastname: [  '', [Validators.required, Validators.min(4), Validators.max(20)], ],
        firstname: [  '', [Validators.required, Validators.min(4), Validators.max(20)], ],
        group: [  '', [Validators.required, Validators.min(4), Validators.max(20)], ],
        dateOfBirth:  ['',[Validators.required],],
        password: [ '', [Validators.required, Validators.min(4), Validators.max(40)],]
      });
  }
  public Submit(): void {
    const registerRequest = this.formGroup.value as RegisterAdminRequest
    this.authService.registerAdmin(registerRequest).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        this.router.navigate(['/login']); 
      },
      error: (err) => {
        console.error('Registration failed:', err);
      }
    });
  }

  public back() {
    window.history.back();
  }
}
