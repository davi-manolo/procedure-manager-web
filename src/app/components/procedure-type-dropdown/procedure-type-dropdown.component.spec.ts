import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureTypeDropdownComponent } from './procedure-type-dropdown.component';

describe('ProcedureTypeDropdownComponent', () => {
  let component: ProcedureTypeDropdownComponent;
  let fixture: ComponentFixture<ProcedureTypeDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcedureTypeDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcedureTypeDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
