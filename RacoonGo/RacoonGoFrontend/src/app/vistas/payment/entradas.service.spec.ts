import { TestBed } from '@angular/core/testing';

import { EntradasService } from './entradas.service';

describe('EntradasService', () => {
  let service: EntradasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntradasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
