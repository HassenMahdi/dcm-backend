import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridCellAutoTypeComponent } from './grid-cell-auto-type.component';

describe('GridCellAutoTypeComponent', () => {
  let component: GridCellAutoTypeComponent;
  let fixture: ComponentFixture<GridCellAutoTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridCellAutoTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridCellAutoTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
