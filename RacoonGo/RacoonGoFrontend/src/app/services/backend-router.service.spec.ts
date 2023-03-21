import { TestBed } from '@angular/core/testing';

import { BackendRouterService } from './backend-router.service';

describe('BackendRouterService', () => {
  let service: BackendRouterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendRouterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
