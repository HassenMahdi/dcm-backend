import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldsPageComponent } from './fields-page.component';

describe('FieldsPageComponent', () => {
  let component: FieldsPageComponent;
  let fixture: ComponentFixture<FieldsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
