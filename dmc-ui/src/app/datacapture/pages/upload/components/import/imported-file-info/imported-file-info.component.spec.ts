import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportedFileInfoComponent } from './imported-file-info.component';

describe('ImportedFileInfoComponent', () => {
  let component: ImportedFileInfoComponent;
  let fixture: ComponentFixture<ImportedFileInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportedFileInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportedFileInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
