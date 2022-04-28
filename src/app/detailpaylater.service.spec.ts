import { TestBed } from '@angular/core/testing';

import { DetailpaylaterService } from './detailpaylater.service';

describe('DetailpaylaterService', () => {
  let service: DetailpaylaterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailpaylaterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
