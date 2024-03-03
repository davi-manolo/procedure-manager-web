import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { preventLoginGuard } from "./prevent-login.guard";

describe('preventLoginGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => preventLoginGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

});
