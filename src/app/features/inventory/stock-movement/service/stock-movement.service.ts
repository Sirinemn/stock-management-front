import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StockMovement } from '../../models/stockmovement';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockMovementService {

  private apiUrl = 'http://localhost:8001/api/stocks';
  constructor(private http: HttpClient) { }

   // Ajouter un mouvement de stock
   addStockMovement(movement: StockMovement): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/movement`, movement);
  }

  // Récupérer l'historique des mouvements d'un produit
  getStockMovements(productId: number, groupId?: number): Observable<StockMovement[]> {
    return this.http.get<StockMovement[]>(`${this.apiUrl}/movements/${productId}groupId?=${groupId}`);
  }

  // Filtrer l'historique des mouvements
  getHistory(filters: { userId?: number; productId?: number; groupId?: number; startDate?: string; endDate?: string }): Observable<StockMovement[]> {
    return this.http.get<StockMovement[]>(`${this.apiUrl}/history`, { params: filters });
  }
}


