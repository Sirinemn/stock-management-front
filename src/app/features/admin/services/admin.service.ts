import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../auth/models/user';
import { MessageResponse } from '../../../shared/models/messageResponse';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = "http://localhost:8001/api/admin"

  constructor(private httpClient: HttpClient) { }

  public getUsers(id: number): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiUrl}/users?id=${id}`);
  }
  public getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrl}/user/${id}`);
  }
  public deleteUser(id: number): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/users/${id}`);
  }
  public updateUser(id: number, user: User): Observable<MessageResponse> {
    return this.httpClient.put<MessageResponse>(`${this.apiUrl}/users/${id}`, user);
  }
  public addCategory(name:string, userId:number): Observable<MessageResponse> {
    return this.httpClient.post<MessageResponse>(`${this.apiUrl}/category?name=${name}&userId=${userId}`, {});
  }
  public deleteCategory(id: number, groupId: number): Observable<MessageResponse> {
    return this.httpClient.delete<MessageResponse>(`${this.apiUrl}/categories/${id}?groupId=${groupId}`);
  }
}
