import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterProducersComponent } from './register-producers.component';
import { HttpClientModule } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ProducersService } from 'src/app/services/producers.service';
import { FormsModule } from '@angular/forms';

describe('RegisterProducersComponent', () => {
  let component: RegisterProducersComponent;
  let fixture: ComponentFixture<RegisterProducersComponent>;

  class ProducersServiceStub {
    getProducers(): Observable<any[]> {
      // Simulate a successful response with an array of producers
      return of([
        { /* mock producer data */ },
        { /* mock producer data */ },
        // Add more mock producer data as needed
      ]);
    }
  
    registerProducers(Lastname: string, Firstname: string, PhoneNum: string, EmailPro: string): Observable<any> {
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
      declarations: [RegisterProducersComponent],
      imports: [HttpClientModule, FormsModule],
      providers: [{ provide: ProducersService, useClass: ProducersServiceStub }]
    });
    fixture = TestBed.createComponent(RegisterProducersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
