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
  private firstLoginSubject = new BehaviorSubject<boolean>(false);
  private isAdminSubject = new BehaviorSubject<boolean>(false);

  public setFirstLogin(value: boolean) {
    this.firstLoginSubject.next(value);
  }
  public setIsAdmin(value: boolean) {
    this.isAdminSubject.next(value);
  }
  public getIsAdmin(): Observable<boolean> {
    return this.isAdminSubject.asObservable();
  }
  public getFirstLogin(): Observable<boolean> {
    return this.firstLoginSubject.asObservable();
  }
  public isAdmin(): boolean {
    return this.userRole.includes('ADMIN');
  }
  
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
    this.userRole = [];
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
