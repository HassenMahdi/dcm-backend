import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFlowComponent } from './upload-flow.component';

describe('UploadFlowComponent', () => {
  let component: UploadFlowComponent;
  let fixture: ComponentFixture<UploadFlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadFlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
