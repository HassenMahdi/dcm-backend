import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionUploadComponent } from './collection-upload.component';

describe('CollectionUploadComponent', () => {
  let component: CollectionUploadComponent;
  let fixture: ComponentFixture<CollectionUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
