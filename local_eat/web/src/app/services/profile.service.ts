import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { Company } from '../models/company.model';
import { Producer } from 'src/app/models/producer.model';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    private url = `${environment.apiUrl}/users`
    GET_COMPANY_URL = '/get-company'
    GET_PRODUCER_URL = '/get-producer'
    CREATE_COMPANY_URL = '/create-company'
    JOIN_COMPANY_URL = '/join-company'
    QUIT_COMPANY_URL = '/quit-company'
    constructor(private http: HttpClient) { }

    getUser(): Observable<User> {
        return this.http.get<User>(this.url);
    }
    getCompany(): Observable<Company> {
        return this.http.get<Company>(this.url + this.GET_COMPANY_URL);
    }
    getProducer(): Observable<Producer> {
        return this.http.get<Producer>(this.url + this.GET_PRODUCER_URL);
    }

    CreateCompany(CompanyName: string, Password: string, Alias: string, Address: string,
        Mail: string, PhoneNum: string, VATNum: string, Description: string): Observable<any> {
        const userData = {
            "CompanyName": CompanyName,
            "Password": Password,
            "Alias": Alias,
            "Address": Address,
            "Mail": Mail,
            "PhoneNum": PhoneNum,
            "VATNum": VATNum,
            "Description": Description,
        };
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            withCredentials: true,
            observe: 'response' as 'response'
        };

        return this.http.post<any>(this.url + this.CREATE_COMPANY_URL, userData, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }
    JoinCompany(CompanyName: string, Password: string): Observable<any> {
        const userData = {
            "CompanyName": CompanyName,
            "Password": Password,
        }
        console.log(userData)
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            withCredentials: true,
            observe: 'response' as 'response'
        };
        return this.http.post<any>(this.url + this.JOIN_COMPANY_URL, userData, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }
    QuitCompany(ProducerId: any): Observable<any> {
        const userData = {
            "ProducerId": ProducerId
        }
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            withCredentials: true,
            observe: 'response' as 'response'
        };
        return this.http.post<any>(this.url + this.QUIT_COMPANY_URL, userData, httpOptions)
            .pipe(
                catchError(this.handleError)
            );

    }
    private handleError(error: any): Observable<never> {
        console.error('Error during request:', error);
        return new Observable<never>((observer) => {
            observer.error(error);
        });
    }
}
