import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadTagsComponent } from './upload-tags.component';

describe('UploadTagsComponent', () => {
  let component: UploadTagsComponent;
  let fixture: ComponentFixture<UploadTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
