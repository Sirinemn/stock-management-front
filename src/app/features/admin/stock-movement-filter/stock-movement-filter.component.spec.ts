import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockMovementFilterComponent } from './stock-movement-filter.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('StockMovementFilterComponent', () => {
  let component: StockMovementFilterComponent;
  let fixture: ComponentFixture<StockMovementFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockMovementFilterComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockMovementFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
