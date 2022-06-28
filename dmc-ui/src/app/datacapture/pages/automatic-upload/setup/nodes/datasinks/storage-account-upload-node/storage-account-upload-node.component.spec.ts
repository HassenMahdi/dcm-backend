import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageAccountUploadNodeComponent } from './storage-account-upload-node.component';

describe('StorageAccountUploadNodeComponent', () => {
  let component: StorageAccountUploadNodeComponent;
  let fixture: ComponentFixture<StorageAccountUploadNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StorageAccountUploadNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageAccountUploadNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
