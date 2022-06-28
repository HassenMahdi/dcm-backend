import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeSplitterComponent } from './node-splitter-component.component';

describe('NodeSplitterComponent', () => {
  let component: NodeSplitterComponent;
  let fixture: ComponentFixture<NodeSplitterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeSplitterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeSplitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
