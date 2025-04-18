import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../../../core/services/session.service';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const mockAuthService = {
    login: jest.fn().mockReturnValue(of({ token: 'mockToken', userId: 'mockUserId' , roles: ['user'], groupId: 1 })),
    getUser: jest.fn().mockReturnValue(of({ 
      id: 'mockUserId', 
      firstame: 'Mock User', 
      lastname: 'last',
      email: 'email',
      dateOfBirth: '2023-01-01',
      createdDate: '2023-01-01',
      lastModifiedDate: '2023-01-01',
      roles: ['user'],
      groupId: 1,
      groupName: 'Mock Group',
      createdBy: 'admin'
    }))
  };
  let sessionServiceMock = { logIn: jest.fn() };
  let mockRouter: any = { events: { subscribe: jest.fn() }, createUrlTree: jest.fn(), serializeUrl: jest.fn() };

  beforeEach(async () => {
    const mockActivatedRoute = {
      snapshot: { paramMap: { get: jest.fn().mockReturnValue('mockValue') } }
    };

    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: AuthService, useValue: mockAuthService },
        { provide: SessionService, useValue: sessionServiceMock },
        FormBuilder
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
