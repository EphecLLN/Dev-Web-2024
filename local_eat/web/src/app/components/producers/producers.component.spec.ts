import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducersComponent } from './producers.component';

describe('ProducersComponent', () => {
  let component: ProducersComponent;
  let fixture: ComponentFixture<ProducersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProducersComponent]
    });
    fixture = TestBed.createComponent(ProducersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
