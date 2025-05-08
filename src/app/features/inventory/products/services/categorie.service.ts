import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../../admin/models/category';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  private apiUrl = "http://localhost:8001/api/categories"

  constructor(private httpClient: HttpClient) { }

  public getCategories(groupId: number): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.apiUrl}?groupId=${groupId}`);
  }
}
