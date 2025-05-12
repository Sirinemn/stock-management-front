import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockMovementDetailComponent } from './stock-movement-detail.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';

describe('StockMovementDetailComponent', () => {
  let component: StockMovementDetailComponent;
  let fixture: ComponentFixture<StockMovementDetailComponent>;
  let mockRouter: any = { events: { subscribe: jest.fn() }, createUrlTree: jest.fn(), serializeUrl: jest.fn() };
  const mockActivatedRoute = {
    snapshot: { params: { id:123 } }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockMovementDetailComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockMovementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
