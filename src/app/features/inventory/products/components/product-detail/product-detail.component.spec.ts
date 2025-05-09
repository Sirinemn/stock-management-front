import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailComponent } from './product-detail.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let mockRouter: any = { events: { subscribe: jest.fn() }, createUrlTree: jest.fn(), serializeUrl: jest.fn() };
  const mockActivatedRoute = {
    snapshot: { params: { id:123 } }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
