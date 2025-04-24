import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { SessionService } from "../services/session.service";
import { AuthStateService } from "../services/auth-state.service";

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {

  constructor(
    private sessionService: SessionService, 
    private router: Router,
    private authStateService: AuthStateService,
    ) {}

  canActivate(): boolean {
    if (this.sessionService.isLogged && this.authStateService.isAdmin()) {
      return true;
    } else {
      this.router.navigate(['404']);
      return false;
    }
  }
}