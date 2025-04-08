import { CanActivate, Router } from "@angular/router";
import { SessionService } from "../services/session.service";

export class AnauthGuard implements CanActivate {
  constructor(private sessionService: SessionService, private router: Router) {}

  canActivate(): boolean {

    if (this.sessionService.isLogged) {
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }
  
}