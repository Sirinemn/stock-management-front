import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../../auth/services/auth.service';
import { SessionService } from '../../../core/services/session.service';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(
    private authService: AuthService,
    private sessionService: SessionService,
  ) { }
  public logOut() {
    this.authService.logout();
    this.sessionService.logOut();
  }

}
