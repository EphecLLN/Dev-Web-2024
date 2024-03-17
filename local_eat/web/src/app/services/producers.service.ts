import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producer } from '../models/producer.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProducersService {
  private url = `${environment.apiUrl}/producers`
  constructor(private http:HttpClient) { }

  getProducers(): Observable<Producer[]>{
    return this.http.get<Producer[]>(this.url);
  }
}
