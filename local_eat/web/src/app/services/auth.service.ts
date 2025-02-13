import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = `${environment.apiUrl}/auth`
  LOGIN_USER_URL = '/login';
  SIGNIN_USER_URL = '/signup';
  AUTHENTICATE_URL = '/authenticate'
  constructor(private http:HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const emailRegEx = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    let userData;
    if (emailRegEx.test(username)) {
      userData = {
        "email": username,
        "password": password
      };
    } else {
      userData = {
        "username": username,
        "password": password
      };
    }

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true,
      observe: 'response' as 'response'
    };

    return this.http.post<any>(this.url + this.LOGIN_USER_URL, userData, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  
  signup(email: string, password: string, username: string): Observable<any> {
    const userData = {
      "email": email,
      "password": password,
      "username": username,
    };

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true,
      observe: 'response' as 'response'
    };

    return this.http.post<any>(this.url + this.SIGNIN_USER_URL, userData, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  authenticate(): Observable<any> {
    return this.http.get<any>(this.url + this.AUTHENTICATE_URL, {})
      .pipe(
        catchError(this.handleError)
      );
  };

  private handleError(error: any): Observable<never> {
    console.error('Error during request:', error);
    return new Observable<never>((observer) => {
      observer.error(error);
    });
  }
  
}
