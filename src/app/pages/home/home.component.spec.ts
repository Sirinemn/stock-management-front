import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let activatedRouteMock: any;

  beforeEach(async () => {
    activatedRouteMock = {
      snapshot: {
        paramMap: of({})
      }
    };
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
