import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetSelectionConfirmComponent } from './sheet-selection-confirm.component';

describe('SheetSelectionConfirmComponent', () => {
  let component: SheetSelectionConfirmComponent;
  let fixture: ComponentFixture<SheetSelectionConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SheetSelectionConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SheetSelectionConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
