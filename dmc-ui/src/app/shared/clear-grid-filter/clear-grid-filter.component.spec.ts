import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearGridFilterComponent } from './clear-grid-filter.component';

describe('ClearGridFilterComponent', () => {
  let component: ClearGridFilterComponent;
  let fixture: ComponentFixture<ClearGridFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClearGridFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearGridFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
