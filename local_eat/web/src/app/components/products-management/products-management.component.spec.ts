import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsManagementComponent } from './products-management.component';
import { HttpClientModule } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ProfileService } from 'src/app/services/profile.service';

describe('ProductsManagementComponent', () => {
  let component: ProductsManagementComponent;
  let fixture: ComponentFixture<ProductsManagementComponent>;

  class ProfileServiceStub {
    getUser(): Observable<any> {
      // Simulate a successful response
      return of({ /* mock user data */ });
    }
  
    getCompany(): Observable<any> {
      // Simulate a successful response
      return of({ /* mock company data */ });
    }
  
    getProducer(): Observable<any> {
      // Simulate a successful response
      return of({ /* mock producer data */ });
    }
  
    createCompany(
      CompanyName: string,
      Password: string,
      Alias: string,
      Address: string,
      Mail: string,
      PhoneNum: string,
      VATNum: string,
      Description: string
    ): Observable<any> {
      // Simulate a successful response
      return of({ /* mock response */ });
    }
  
    joinCompany(CompanyName: string, Password: string): Observable<any> {
      // Simulate a successful response
      return of({ /* mock response */ });
    }
  
    quitCompany(ProducerId: any): Observable<any> {
      // Simulate a successful response
      return of({ /* mock response */ });
    }
  
    private handleError(error: any): Observable<never> {
      console.error('Error during request:', error);
      return new Observable<never>((observer) => {
        observer.error(error);
      });
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsManagementComponent],
      imports: [HttpClientModule],
      providers: [{ provide: ProfileService, useClass: ProfileServiceStub }]
    });
    fixture = TestBed.createComponent(ProductsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
