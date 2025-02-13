import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatchphraseComponent } from './catchphrase.component';

describe('CatchphraseComponent', () => {
  let component: CatchphraseComponent;
  let fixture: ComponentFixture<CatchphraseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatchphraseComponent]
    });
    fixture = TestBed.createComponent(CatchphraseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
