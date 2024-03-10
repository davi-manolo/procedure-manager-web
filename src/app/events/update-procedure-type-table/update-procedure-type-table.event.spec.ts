import { TestBed } from '@angular/core/testing';

import { UpdateProcedureTypeTableEvent } from './update-procedure-type-table.event';

describe('UpdateProcedureTypeTableEvent', () => {
  let service: UpdateProcedureTypeTableEvent;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateProcedureTypeTableEvent);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
