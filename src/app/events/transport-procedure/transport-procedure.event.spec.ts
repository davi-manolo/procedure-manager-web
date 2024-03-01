import { TestBed } from '@angular/core/testing';

import { TransportProcedureEventService } from './transport-procedure.event';

describe('TransportProcedureEventService', () => {
  let service: TransportProcedureEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransportProcedureEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
