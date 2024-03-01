import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedurePanelComponent } from './procedure-panel.component';

describe('AddProcedurePanelComponent', () => {
  let component: ProcedurePanelComponent;
  let fixture: ComponentFixture<ProcedurePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcedurePanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcedurePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
