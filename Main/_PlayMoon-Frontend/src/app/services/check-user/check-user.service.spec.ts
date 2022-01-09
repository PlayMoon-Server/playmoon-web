import { TestBed } from '@angular/core/testing';

import { CheckUserService } from './check-user.service';

describe('CheckUserService', () => {
  let service: CheckUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
