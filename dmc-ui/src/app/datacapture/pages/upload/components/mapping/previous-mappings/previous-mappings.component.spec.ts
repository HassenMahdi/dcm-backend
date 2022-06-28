import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousMappingsComponent } from './previous-mappings.component';

describe('PreviousMappingsComponent', () => {
  let component: PreviousMappingsComponent;
  let fixture: ComponentFixture<PreviousMappingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviousMappingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousMappingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
