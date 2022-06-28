import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcmPreviewGridComponent } from './dcm-preview-grid.component';

describe('DcmPreviewGridComponent', () => {
  let component: DcmPreviewGridComponent;
  let fixture: ComponentFixture<DcmPreviewGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DcmPreviewGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DcmPreviewGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
