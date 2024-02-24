import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureDropdownComponent } from './procedure-dropdown.component';

describe('DropdownComponent', () => {
  let component: ProcedureDropdownComponent;
  let fixture: ComponentFixture<ProcedureDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcedureDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcedureDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
