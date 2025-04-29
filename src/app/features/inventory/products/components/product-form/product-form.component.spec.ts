import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFormComponent } from './product-form.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { SessionService } from '../../../../../core/services/session.service';
import { ActivatedRoute, Router } from '@angular/router';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  let mockRouter: any = { events: { subscribe: jest.fn() }, createUrlTree: jest.fn(), serializeUrl: jest.fn() };
  const mockActivatedRoute = {
    snapshot: { paramMap: { get: jest.fn().mockReturnValue('mockValue') } }
  };
  let mockSessionService: Partial<SessionService>;
  let mockUser = {
    id: 1,
    firstname: 'first',
    lastname: 'last',
    email: 'email@test.fr',
    dateOfBirth: '01/02/1992',
    createdDate: '10/04/2025',
    lastModifiedDate: '10/04/2025',
    firstLogin: false,
    roles: ['USER'],
    groupId: 1,
    groupName: 'group',
    createdBy: 2,
  }

  beforeEach(async () => {
    mockSessionService = {getUser: jest.fn().mockReturnValue(mockUser)}
    
    await TestBed.configureTestingModule({
      imports: [ProductFormComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: SessionService, useValue: mockSessionService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  

  it('should create', () => {
    expect(component).toBeTruthy();
  })

});
