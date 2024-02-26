import { TestBed } from '@angular/core/testing';

import { DatePeriodService } from './date-period.service';

describe('DatePeriodService', () => {
  let service: DatePeriodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatePeriodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
