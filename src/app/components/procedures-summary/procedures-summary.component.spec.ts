import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProceduresSummaryComponent } from './procedures-summary.component';

describe('ProceduresSummaryComponent', () => {
  let component: ProceduresSummaryComponent;
  let fixture: ComponentFixture<ProceduresSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProceduresSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProceduresSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
