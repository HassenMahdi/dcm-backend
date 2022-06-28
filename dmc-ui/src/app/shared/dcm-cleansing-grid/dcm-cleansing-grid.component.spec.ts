import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcmCleansingGridComponent } from './dcm-cleansing-grid.component';

describe('DcmCleansingGridComponent', () => {
  let component: DcmCleansingGridComponent;
  let fixture: ComponentFixture<DcmCleansingGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DcmCleansingGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DcmCleansingGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
