import { TestBed } from '@angular/core/testing';

import { DatePeriodEvent } from './date-period.event';

describe('DatePeriodEvent', () => {
  let event: DatePeriodEvent;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    event = TestBed.inject(DatePeriodEvent);
  });

  it('should be created', () => {
    expect(event).toBeTruthy();
  });
});
