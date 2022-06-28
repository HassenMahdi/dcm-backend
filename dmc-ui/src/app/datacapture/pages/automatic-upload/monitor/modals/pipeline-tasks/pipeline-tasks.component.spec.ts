import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineTasksComponent } from './pipeline-tasks.component';

describe('PipelineTasksComponent', () => {
  let component: PipelineTasksComponent;
  let fixture: ComponentFixture<PipelineTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PipelineTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelineTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
