import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginRequest } from '../models/loginRequest';
import { AuthResponse } from '../models/auth-response';
import { RegisterAdminRequest } from '../models/registerRequest';
import { RegisterUserRequest } from '../models/registerUserRequest';
import { User } from '../models/user';
import { ChangePasswordRequest } from '../models/ChangePasswordRequest';
import { MessageResponse } from '../../shared/models/messageResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = "http://localhost:8001/api/auth"

  constructor(private httpclient: HttpClient, private router: Router) { }

  public login(loginRequest: LoginRequest): Observable<AuthResponse> {
    return this.httpclient.post<AuthResponse>(`${this.apiUrl}/login`, loginRequest);
  }
  public getUser(id: number): Observable<User> {
    return this.httpclient.get<User>(`${this.apiUrl}/${id}`);
  }

  public registerAdmin(registerRequest: RegisterAdminRequest) : Observable<any> {
    return this.httpclient.post(`${this.apiUrl}/register`, registerRequest);
  }

  public registerUser(registerRequest: RegisterUserRequest) : Observable<any> {
    return this.httpclient.post(`${this.apiUrl}/register/user`, registerRequest);
  }
  public logout() {
    localStorage.removeItem('token');
    this.router.navigate(['auth/login']);
  }
  public isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
  public getAuthenticatedUser(): Observable<User> {
    return this.httpclient.get<User>(`${this.apiUrl}/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }
  public changePassword(changePasswordRequest: ChangePasswordRequest): Observable<MessageResponse> {
    return this.httpclient.patch<MessageResponse>(`${this.apiUrl}/users/change-password`, changePasswordRequest);
  }
}
