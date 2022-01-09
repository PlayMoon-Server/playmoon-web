import { TestBed } from '@angular/core/testing';

import { SendHttpReqService } from './send-http-req.service';

describe('SendHttpReqService', () => {
  let service: SendHttpReqService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendHttpReqService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
