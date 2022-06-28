import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalReferenceTypesComponent } from './global-reference-types.component';

describe('GlobalReferenceTypesComponent', () => {
  let component: GlobalReferenceTypesComponent;
  let fixture: ComponentFixture<GlobalReferenceTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalReferenceTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalReferenceTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
