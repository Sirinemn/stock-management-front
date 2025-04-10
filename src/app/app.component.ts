import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./pages/footer/footer.component";
import { AuthService } from './auth/services/auth.service';
import { SessionService } from './core/services/session.service';
import { User } from './auth/models/user';
import { HeaderComponent } from "./shared/components/header/header.component";
import { NgIf } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, HeaderComponent, NgIf, MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'stock-management-front';
  public isLogged: boolean = false;
  public user?: User;

  constructor(
    private authService: AuthService,
    private sessionService: SessionService,
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.authService.getAthenticatedUser().subscribe({
        next: (user) => {
          this.sessionService.logIn(user);
          this.isLogged = true;
          this.user = user;
        },
        error: (err) => {
          console.error('Erreur lors de la récupération de l\'utilisateur :', err);
        }
      });
    }
    this.sessionService.isLogged$().subscribe((logged) => {
      this.isLogged = logged;
    });

  }
}
