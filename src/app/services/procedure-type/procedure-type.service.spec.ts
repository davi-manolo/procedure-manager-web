import { TestBed } from '@angular/core/testing';

import { ProcedureTypeService } from './procedure-type.service';

describe('ProcedureTypeService', () => {
  let service: ProcedureTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcedureTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
