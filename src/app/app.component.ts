import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from "./shared/components/footer/footer.component";
import { AuthService } from './auth/services/auth.service';
import { SessionService } from './core/services/session.service';
import { User } from './auth/models/user';
import { HeaderComponent } from "./shared/components/header/header.component";
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PasswordChangeDialogComponent } from './mat-dialog/password-change-dialog/password-change-dialog.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, HeaderComponent, CommonModule, MatToolbarModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'stock-management-front';
  public isLogged$: Observable<boolean> = of(false);
  public user?: User;
  public firstLogin: boolean = false;

  constructor(
    private authService: AuthService,
    private sessionService: SessionService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.autoLog();
    this.isLogged$ = this.sessionService.isLogged$();
  }
  public $isLogged(): Observable<boolean> {
    return this.sessionService.isLogged$();
  }
  public autoLog(): void {
    this.authService.getAuthenticatedUser().subscribe({
      next: (user: User) => {
        this.sessionService.logIn(user);
        this.user = user;
        this.firstLogin = user.firstLogin? true : false;
        if (this.firstLogin) {
          this.openPasswordChangeDialog();
        }
        
        if (this.router.url !== '/features/dashboard') {
          this.router.navigate(['/features/dashboard']);
        }
      },
      error: (err) => {
        if (err.status === 401) {
          console.log('Utilisateur non authentifié, déconnexion automatique.');
          this.sessionService.logOut();
        } else {
          console.error('Erreur lors de la récupération des informations utilisateur :', err);
        }
      },
    });
  }
  private openPasswordChangeDialog(): void {
    const dialogRef = this.dialog.open(PasswordChangeDialogComponent, {
      width: '400px',
      disableClose: true, // Empêcher la fermeture sans action
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'redirect') {
        this.router.navigate(['auth/change-password']);
      }
    });
  }
}
