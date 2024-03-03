import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePanelComponent } from './delete-panel.component';

describe('DeletePanelComponent', () => {
  let component: DeletePanelComponent;
  let fixture: ComponentFixture<DeletePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletePanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
