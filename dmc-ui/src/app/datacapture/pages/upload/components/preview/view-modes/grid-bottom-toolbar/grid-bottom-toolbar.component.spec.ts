import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridBottomToolbarComponent } from './grid-bottom-toolbar.component';

describe('GridBottomToolbarComponent', () => {
  let component: GridBottomToolbarComponent;
  let fixture: ComponentFixture<GridBottomToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridBottomToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridBottomToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
