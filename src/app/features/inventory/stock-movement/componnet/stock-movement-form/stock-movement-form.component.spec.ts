import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockMovementFormComponent } from './stock-movement-form.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('StockMovementFormComponent', () => {
  let component: StockMovementFormComponent;
  let fixture: ComponentFixture<StockMovementFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockMovementFormComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockMovementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
