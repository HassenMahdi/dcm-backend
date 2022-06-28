import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceInputComponent } from './reference-input.component';

describe('ReferenceInputComponent', () => {
  let component: ReferenceInputComponent;
  let fixture: ComponentFixture<ReferenceInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferenceInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenceInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
