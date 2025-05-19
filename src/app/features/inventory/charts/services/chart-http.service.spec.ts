import { TestBed } from '@angular/core/testing';

import { ChartHttpService } from './chart-http.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { DashboardOverview } from '../models/dashboardOverview.model';
import { ProductQuantity } from '../models/product-quantity.model';
import { StockChartSeries } from '../models/stock-chart-series.model';

describe('ChartHttpService', () => {
  let service: ChartHttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        provideHttpClient(),
        provideHttpClientTesting() 
      ]
    });
    service = TestBed.inject(ChartHttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should fetch dashboard overview', () => {
    const mockOverview = { 
      totalProducts: 100, lowStockProducts: 20 
    } as DashboardOverview;

    service.getDashboardOverview(1).subscribe(overview => {
      expect(overview).toEqual(mockOverview);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/overview?groupId=1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockOverview);
  });
  it('should fetch pie chart data', () => {
    const mockData: ProductQuantity[] = [{ productName: 'Product A', quantity: 50 }];

    service.getPieChartData(1).subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/pie?groupId=1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
  it('should fetch line chart data', () => {
    const mockData: StockChartSeries[] = [{ name: 'Stock Flow', series: [{ date: '2023-01-01', value: 100 }] }];

    service.getLineChartData(1).subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/line?groupId=1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
});
