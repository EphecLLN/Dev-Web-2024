import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  class AuthServiceStub {
    LOGIN_USER_URL = '/login';
    
    constructor() { }
  
    login(username: string, password: string): Observable<any> {
      // Simulate a successful login response
      const mockResponse = {
        status: 200,
        body: { message: 'User logged in successfully'}
      };
      return of(mockResponse);
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: Router, useClass: Router}, { provide: AuthService, useClass: AuthServiceStub }]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    component.loginForm.get('usernameValid')?.setValue('');
    component.loginForm.get('passwordValid')?.setValue('');
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('form valid when filled', () => {
    component.loginForm.get('usernameValid')?.setValue('test');
    component.loginForm.get('passwordValid')?.setValue('password123');
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('form invalid when password is too short', () => {
    component.loginForm.get('usernameValid')?.setValue('test');
    component.loginForm.get('passwordValid')?.setValue('pass');
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('form invalid when password is missing', () => {
    component.loginForm.get('usernameValid')?.setValue('test');
    component.loginForm.get('passwordValid')?.setValue('');
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('form invalid when username is missing', () => {
    component.loginForm.get('usernameValid')?.setValue('');
    component.loginForm.get('passwordValid')?.setValue('password123');
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('form invalid when username and password are missing', () => {
    component.loginForm.get('usernameValid')?.setValue('');
    component.loginForm.get('passwordValid')?.setValue('');
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should call onSubmit method', () => {
    spyOn(component, 'login');
    let form = fixture.debugElement.query(By.css('form')).nativeElement;
    form.dispatchEvent(new Event('submit'));
    expect(component.login).toHaveBeenCalledTimes(1);
  });
});
