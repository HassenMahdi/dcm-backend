import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualImportNodeComponent } from './manual-import-node.component';

describe('ManualImportNodeComponent', () => {
  let component: ManualImportNodeComponent;
  let fixture: ComponentFixture<ManualImportNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualImportNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualImportNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
