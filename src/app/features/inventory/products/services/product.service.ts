import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../models/product';
import { Observable } from 'rxjs';
import { MessageResponse } from '../../../../shared/models/messageResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = "http://localhost:8001/api/products"

  constructor(private httpClient: HttpClient) { }

  public addProduct(product: Product): Observable<MessageResponse> {
    return this.httpClient.post<MessageResponse>(`${this.apiUrl}`, product);
  }
  public getProducts(groupId: number): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.apiUrl}?groupId=${groupId}`);
  }
  public getProduct(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.apiUrl}/${id}`);
  }
  public updateProduct(id: number, product: Product): Observable<MessageResponse> {
    return this.httpClient.put<MessageResponse>(`${this.apiUrl}/${id}`, product);
  }
  public deleteProduct(id: number, groupId: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}/${id}?groupId=${groupId}`);
  }
}
