import { TestBed } from '@angular/core/testing';

import { ProducersService } from './producers.service';
import { HttpClientModule } from '@angular/common/http';

describe('ProducersService', () => {
  let service: ProducersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ProducersService]
    });
    service = TestBed.inject(ProducersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
