import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceTypeInputComponent } from './reference-type-input.component';

describe('ReferenceTypeInputComponent', () => {
  let component: ReferenceTypeInputComponent;
  let fixture: ComponentFixture<ReferenceTypeInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferenceTypeInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenceTypeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
