import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalReferenceDataComponent } from './global-reference-data.component';

describe('GlobalReferenceDataComponent', () => {
  let component: GlobalReferenceDataComponent;
  let fixture: ComponentFixture<GlobalReferenceDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalReferenceDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalReferenceDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
