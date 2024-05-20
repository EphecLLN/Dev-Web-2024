import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupComponent } from './signup.component';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  class AuthServiceStub {
    LOGIN_USER_URL = '/login';
    SIGNIN_USER_URL = '/signup';
    
    constructor() { }
  
    login(username: string, password: string): Observable<any> {
      // Simulate a successful login response
      const mockResponse = {
        status: 200,
        body: { message: 'User logged in successfully'}
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
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: Router, useClass: Router}, { provide: AuthService, useClass: AuthServiceStub }]
    });
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    component.signupForm.get('usernameValid')?.setValue('');
    component.signupForm.get('passwordValid')?.setValue('');
    component.signupForm.get('emailValid')?.setValue('');
    expect(component.signupForm.valid).toBeFalsy();
  });

  it('form valid when filled', () => {
    component.signupForm.get('usernameValid')?.setValue('test');
    component.signupForm.get('passwordValid')?.setValue('password123');
    component.signupForm.get('emailValid')?.setValue('test@example.com');
    expect(component.signupForm.valid).toBeTruthy();
  });

  it('form invalid when email is invalid', () => {
    component.signupForm.get('usernameValid')?.setValue('test');
    component.signupForm.get('passwordValid')?.setValue('password123');
    component.signupForm.get('emailValid')?.setValue('test');
    expect(component.signupForm.valid).toBeFalsy();
  });

  it('form invalid when password is too short', () => {
    component.signupForm.get('usernameValid')?.setValue('test');
    component.signupForm.get('passwordValid')?.setValue('pass');
    component.signupForm.get('emailValid')?.setValue('test@example.com');
    expect(component.signupForm.valid).toBeFalsy();
  });

  it('form invalid when password is missing', () => {
    component.signupForm.get('usernameValid')?.setValue('test');
    component.signupForm.get('passwordValid')?.setValue('');
    component.signupForm.get('emailValid')?.setValue('test@example.com');
    expect(component.signupForm.valid).toBeFalsy();
  });

  it('form invalid when username is missing', () => {
    component.signupForm.get('usernameValid')?.setValue('');
    component.signupForm.get('passwordValid')?.setValue('password123');
    component.signupForm.get('emailValid')?.setValue('test@example.com');
    expect(component.signupForm.valid).toBeFalsy();
  });

  it('form invalid when email is missing', () => {
    component.signupForm.get('usernameValid')?.setValue('test');
    component.signupForm.get('passwordValid')?.setValue('password123');
    component.signupForm.get('emailValid')?.setValue('');
    expect(component.signupForm.valid).toBeFalsy();
  });

  it('form invalid when email and password are missing', () => {
    component.signupForm.get('usernameValid')?.setValue('test');
    component.signupForm.get('passwordValid')?.setValue('');
    component.signupForm.get('emailValid')?.setValue('');
    expect(component.signupForm.valid).toBeFalsy();
  });

  it('form invalid when username and email are missing', () => {
    component.signupForm.get('usernameValid')?.setValue('');
    component.signupForm.get('passwordValid')?.setValue('password123');
    component.signupForm.get('emailValid')?.setValue('');
    expect(component.signupForm.valid).toBeFalsy();
  });

  it('form invalid when username and password are missing', () => {
    component.signupForm.get('usernameValid')?.setValue('');
    component.signupForm.get('passwordValid')?.setValue('');
    component.signupForm.get('emailValid')?.setValue('test@example.com');
    expect(component.signupForm.valid).toBeFalsy();
  });

  it('should call onSubmit method', () => {
    spyOn(component, 'signup');
    let form = fixture.debugElement.query(By.css('form')).nativeElement;
    form.dispatchEvent(new Event('submit'));
    expect(component.signup).toHaveBeenCalledTimes(1);
  });
});
