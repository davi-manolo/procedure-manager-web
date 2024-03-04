import { TestBed } from '@angular/core/testing';

import { UpdateProcedureTableEvent } from './update-procedure-table.event';

describe('UpdateProcedureTableEvent', () => {
  let service: UpdateProcedureTableEvent;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateProcedureTableEvent);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
