import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeMergeComponent } from './node-merge-component.component';

describe('NodeMergeComponent', () => {
  let component: NodeMergeComponent;
  let fixture: ComponentFixture<NodeMergeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeMergeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeMergeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
