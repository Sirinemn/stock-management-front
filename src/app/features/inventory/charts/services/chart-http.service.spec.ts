import { TestBed } from '@angular/core/testing';

import { ChartHttpService } from './chart-http.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ChartHttpService', () => {
  let service: ChartHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        provideHttpClient(),
        provideHttpClientTesting() 
      ]
    });
    service = TestBed.inject(ChartHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
