import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiplineTemplateViewerComponent } from './pipline-template-viewer.component';

describe('PiplineTemplateViewerComponent', () => {
  let component: PiplineTemplateViewerComponent;
  let fixture: ComponentFixture<PiplineTemplateViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiplineTemplateViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PiplineTemplateViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
