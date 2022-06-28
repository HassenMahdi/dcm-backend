import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubstringComponent } from './substring.component';

describe('SubstringComponent', () => {
  let component: SubstringComponent;
  let fixture: ComponentFixture<SubstringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubstringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubstringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
