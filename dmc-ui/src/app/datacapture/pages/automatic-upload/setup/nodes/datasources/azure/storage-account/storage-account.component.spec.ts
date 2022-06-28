import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageAccountImportNodeComponent } from './storage-account.component';

describe('StorageAccountComponent', () => {
  let component: StorageAccountImportNodeComponent;
  let fixture: ComponentFixture<StorageAccountImportNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StorageAccountImportNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageAccountImportNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
