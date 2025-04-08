import { CanActivate, Router } from "@angular/router";
import { SessionService } from "../services/session.service";

export class AuthGuard implements CanActivate {
    
  constructor(private sessionService: SessionService, private router: Router) {}

  canActivate(): boolean {
    if (this.sessionService.isLogged) {
      return true;
    } else {
      this.router.navigate(['auth/login']);
      return false;
    }
  }
  
}