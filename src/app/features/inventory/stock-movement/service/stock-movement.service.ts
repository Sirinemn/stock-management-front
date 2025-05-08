import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StockMovement } from '../../models/stockmovement';
import { Observable } from 'rxjs';
import { MessageResponse } from '../../../../shared/models/messageResponse';

@Injectable({
  providedIn: 'root'
})
export class StockMovementService {

  private apiUrl = 'http://localhost:8001/api/stocks';
  constructor(private http: HttpClient) { }

  public addStockMovement(movement: StockMovement): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(`${this.apiUrl}/movement`, movement);
  }

  public getStockMovementsByProduct(productId: number, groupId?: number): Observable<StockMovement[]> {
    return this.http.get<StockMovement[]>(`${this.apiUrl}/movements/${productId}groupId?=${groupId}`);
  }

  public getHistory(filters: { userId?: number; productId?: number; groupId?: number; startDate?: string; endDate?: string }): Observable<StockMovement[]> {
    return this.http.get<StockMovement[]>(`${this.apiUrl}/history`, { params: filters });
  }
  public getStockMovementsByGroup(groupId: number): Observable<StockMovement[]> {
    return this.http.get<StockMovement[]>(`${this.apiUrl}/movements?groupId=${groupId}`);
  }
  public deleteStockMovement(id: number): Observable<MessageResponse> {
    return this.http.delete<MessageResponse>(`${this.apiUrl}/movement/${id}`);
  }
  public updateStockMovement(id: number, movement: StockMovement): Observable<MessageResponse> {
    return this.http.put<MessageResponse>(`${this.apiUrl}/movement/${id}`, movement);
  }
}


