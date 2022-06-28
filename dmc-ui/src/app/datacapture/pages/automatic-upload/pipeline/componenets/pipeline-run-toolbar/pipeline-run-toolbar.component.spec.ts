import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineRunToolbarComponent } from './pipeline-run-toolbar.component';

describe('PipelineRunToolbarComponent', () => {
  let component: PipelineRunToolbarComponent;
  let fixture: ComponentFixture<PipelineRunToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PipelineRunToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelineRunToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
