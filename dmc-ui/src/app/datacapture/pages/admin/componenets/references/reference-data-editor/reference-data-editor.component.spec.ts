import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceDataEditorComponent } from './reference-data-editor.component';

describe('ReferenceDataEditorComponent', () => {
  let component: ReferenceDataEditorComponent;
  let fixture: ComponentFixture<ReferenceDataEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferenceDataEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenceDataEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
