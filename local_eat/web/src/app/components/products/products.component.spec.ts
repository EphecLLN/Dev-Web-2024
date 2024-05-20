import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { HttpClientModule } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { NavComponent } from '../nav/nav.component';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  class ProductsServiceStub {
    getProducts(): Observable<Product[]> {
      // Simulate a successful response with an array of products
      return of([
        { id: '1', name: 'Product 1', cat: 'Category 1', description: 'Description of Product 1', picture: 'product1.jpg' },
        { id: '2', name: 'Product 2', cat: 'Category 2', description: 'Description of Product 2', picture: 'product2.jpg' },
        { id: '3', name: 'Product 3', cat: 'Category 1', description: 'Description of Product 3', picture: 'product3.jpg' },
        // Add more mock product data as needed
      ]);
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsComponent, NavComponent],
      imports: [HttpClientModule],
      providers: [{ provide: ProductsService, useClass: ProductsServiceStub }]
    });
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
