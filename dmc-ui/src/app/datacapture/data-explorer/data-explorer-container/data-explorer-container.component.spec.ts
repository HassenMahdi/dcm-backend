import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataExplorerContainerComponent } from './data-explorer-container.component';

describe('DataExplorerContainerComponent', () => {
  let component: DataExplorerContainerComponent;
  let fixture: ComponentFixture<DataExplorerContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataExplorerContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataExplorerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
