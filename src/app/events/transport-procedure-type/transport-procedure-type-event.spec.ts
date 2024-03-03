import { TestBed } from '@angular/core/testing';

import { TransportProcedureTypeEvent } from './transport-procedure-type-event';

describe('TransportProcedureTypeEvent', () => {
  let service: TransportProcedureTypeEvent;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransportProcedureTypeEvent);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
