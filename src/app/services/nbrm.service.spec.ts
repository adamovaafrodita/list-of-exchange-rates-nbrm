import { TestBed } from '@angular/core/testing';

import { NbrmService } from './nbrm.service';

describe('NbrmService', () => {
  let service: NbrmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NbrmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
