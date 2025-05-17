import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardOverview } from '../models/dashboardOverview.model';
import { ProductQuantity } from '../models/product-quantity.model';
import { StockChartSeries } from '../models/stock-chart-series.model';


@Injectable({
  providedIn: 'root'
})
export class ChartHttpService {
  private apiUrl = "http://localhost:8001/api/dashboard";

  constructor(private httpClient: HttpClient) { }
  
  public getDashboardOverview(groupId: number): Observable<DashboardOverview> {
    return this.httpClient.get<DashboardOverview>(`${this.apiUrl}/overview?groupId=${groupId}`);
  }
  public getPieChartData(groupId: number): Observable<ProductQuantity[]> {
    return this.httpClient.get<ProductQuantity[]>(`${this.apiUrl}/pie?groupId=${groupId}`);
  }
  public getLineChartData(groupId: number): Observable<StockChartSeries[]> {
    return this.httpClient.get<StockChartSeries[]>(`${this.apiUrl}/line?groupId=${groupId}`);
  }
}
