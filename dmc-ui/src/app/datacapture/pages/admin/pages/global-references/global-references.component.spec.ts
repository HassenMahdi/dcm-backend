import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalReferencesComponent } from './global-references.component';

describe('GlobalReferencesComponent', () => {
  let component: GlobalReferencesComponent;
  let fixture: ComponentFixture<GlobalReferencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalReferencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalReferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
