import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    private url: string = `${environment.apiUrl}/products`;
    constructor(private http: HttpClient) { }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.url);
    }
}
