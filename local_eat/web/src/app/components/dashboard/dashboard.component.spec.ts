import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { NavComponent } from '../nav/nav.component';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CatchphraseComponent } from '../catchphrase/catchphrase.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  class AuthServiceStub {
    LOGIN_USER_URL = '/login';
    SIGNIN_USER_URL = '/signup';
    
    constructor() { }
  
    login(username: string, password: string): Observable<any> {
      // Simulate a successful login response
      const mockResponse = {
        status: 200,
        body: { message: 'User logged in successfully' }
      };
      return of(mockResponse);
    }
    
    signup(email: string, password: string, username: string): Observable<any> {
      // Simulate a successful signup response
      const mockResponse = {
        status: 201,
        body: { message: 'User created successfully' }
      };
      return of(mockResponse);
    }

    authenticate(): Observable<any> {
      // Simulate a successful authenticate response
      const mockResponse = {
        status: 200,
        body: { authenticated: true, user: { username: 'mock-username', email: 'mock-email@example.com' } }
      };
      return of(mockResponse);
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent, NavComponent, CatchphraseComponent],
      providers: [{ provide: AuthService, useClass: AuthServiceStub }]
    });
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
