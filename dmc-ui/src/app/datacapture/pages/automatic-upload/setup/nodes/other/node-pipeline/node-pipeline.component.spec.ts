import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodePipelineComponent } from './node-pipeline.component';

describe('NodePipelineComponent', () => {
  let component: NodePipelineComponent;
  let fixture: ComponentFixture<NodePipelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodePipelineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodePipelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
