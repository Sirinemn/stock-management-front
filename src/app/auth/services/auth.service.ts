import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginRequest } from '../models/loginRequest';
import { AuthResponse } from '../models/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = "http://localhost:8001/api/auth"

  constructor(private httpclient: HttpClient, private router: Router) { }

  public login(loginRequest: LoginRequest): Observable<AuthResponse> {
    return this.httpclient.post<AuthResponse>(`${this.apiUrl}/login`, loginRequest)
  }
}
