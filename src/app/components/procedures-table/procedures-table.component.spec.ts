import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProceduresTableComponent } from './procedures-table.component';

describe('ProceduresTableComponent', () => {
  let component: ProceduresTableComponent;
  let fixture: ComponentFixture<ProceduresTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProceduresTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProceduresTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
