import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../auth/models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = "http://localhost:8001/api/admin"

  constructor(private httpClient: HttpClient) { }

  public getUsers(id: number): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiUrl}/users/${id}`);
  }
  public getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrl}/users/${id}`);
  }
  public deleteUser(id: number): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/users/${id}`);
  }
}
