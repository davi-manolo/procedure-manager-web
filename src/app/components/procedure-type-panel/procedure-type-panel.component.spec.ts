import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureTypePanelComponent } from './procedure-type-panel.component';

describe('ProcedureTypePanelComponent', () => {
  let component: ProcedureTypePanelComponent;
  let fixture: ComponentFixture<ProcedureTypePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcedureTypePanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcedureTypePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
