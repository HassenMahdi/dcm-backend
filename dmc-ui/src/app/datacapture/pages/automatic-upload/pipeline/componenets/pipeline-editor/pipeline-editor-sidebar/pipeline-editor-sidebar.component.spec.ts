import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineEditorSidebarComponent } from './pipeline-editor-sidebar.component';

describe('PipelineEditorSidebarComponent', () => {
  let component: PipelineEditorSidebarComponent;
  let fixture: ComponentFixture<PipelineEditorSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PipelineEditorSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelineEditorSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
