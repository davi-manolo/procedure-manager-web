import { TestBed } from '@angular/core/testing';

import { TransportProcedureEvent } from './transport-procedure.event';

describe('TransportProcedureEvent', () => {
  let service: TransportProcedureEvent;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransportProcedureEvent);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
