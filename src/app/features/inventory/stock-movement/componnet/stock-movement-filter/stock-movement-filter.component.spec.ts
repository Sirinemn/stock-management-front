import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockMovementFilterComponent } from './stock-movement-filter.component';

describe('StockMovementFilterComponent', () => {
  let component: StockMovementFilterComponent;
  let fixture: ComponentFixture<StockMovementFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockMovementFilterComponent]
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
