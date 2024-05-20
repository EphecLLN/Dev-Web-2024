import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Producer } from '../models/producer.model';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class ProducersService {
    private url = `${environment.apiUrl}/producers`
    REGISTER_PRODUCER_URL = '/register';
    constructor(private http: HttpClient) { }

    getProducers(): Observable<Producer[]> {
        return this.http.get<Producer[]>(this.url);
    }

    registerProducers(Lastname: string, Firstname: string, PhoneNum: string, EmailPro: string): Observable<any> {
        const userData = {
            "Lastname": Lastname,
            "Firstname": Firstname,
            "PhoneNum": PhoneNum,
            "EmailPro": EmailPro,
        };


        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            withCredentials: true,
            observe: 'response' as 'response'
        };
        return this.http.post<any>(this.url + this.REGISTER_PRODUCER_URL, userData, httpOptions)
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

