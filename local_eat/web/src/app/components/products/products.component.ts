import { Component } from '@angular/core';
import { Observable, of, catchError, ignoreElements } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { Unsub } from 'src/app/utils/unsub';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends Unsub {
    constructor(private productsService: ProductsService) {
        super();
    }

    productsList$: Observable<Product[]>;
    productsError$: Observable<string>;
    ngOnInit() {
        this.productsList$ = this.productsService.getProducts();
        this.productsError$ = this.productsList$.pipe(
            ignoreElements(),
            catchError(() => {
                return of("Error while loading products")
            })
        );
    }
}
