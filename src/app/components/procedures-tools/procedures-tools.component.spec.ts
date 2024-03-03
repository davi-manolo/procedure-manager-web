import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProceduresToolsComponent } from './procedures-tools.component';

describe('ProceduresToolsComponent', () => {
  let component: ProceduresToolsComponent;
  let fixture: ComponentFixture<ProceduresToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProceduresToolsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProceduresToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
