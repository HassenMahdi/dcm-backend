import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPipelineMetadataComponent } from './edit-pipeline-metadata.component';

describe('EditPipelineMetadataComponent', () => {
  let component: EditPipelineMetadataComponent;
  let fixture: ComponentFixture<EditPipelineMetadataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPipelineMetadataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPipelineMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
