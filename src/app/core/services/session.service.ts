import { Injectable } from '@angular/core';
import { User } from '../../auth/models/user';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public isLogged = false;
  public user: User | undefined;
  public userRole!:string[];
  private isLoggedSubject = new BehaviorSubject<boolean>(this.isLogged);
 
  
  public isLogged$(): Observable<boolean> {
    return this.isLoggedSubject.asObservable();
  }

  public logIn(user: User): void {
    this.isLogged = true;
    this.user = user;
    this.userRole = user.roles;
    this.next();
  }

  public logOut(): void {
    this.isLogged = false;
    this.user = undefined;
    this.next();
  }
  public getUser(): User | undefined {
    return this.user;
  }
  public getUserRole(): string[] {
    return this.userRole;
  }
  private next(): void {
    this.isLoggedSubject.next(this.isLogged);
  }
  
}
