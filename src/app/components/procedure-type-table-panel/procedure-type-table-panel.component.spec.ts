import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureTypeTablePanelComponent } from './procedure-type-table-panel.component';

describe('ProcedureTypeTablePanelComponent', () => {
  let component: ProcedureTypeTablePanelComponent;
  let fixture: ComponentFixture<ProcedureTypeTablePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcedureTypeTablePanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcedureTypeTablePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
