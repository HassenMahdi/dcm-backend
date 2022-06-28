import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectorPreviewComponent } from './connector-preview.component';

describe('ConnectorPreviewComponent', () => {
  let component: ConnectorPreviewComponent;
  let fixture: ComponentFixture<ConnectorPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectorPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectorPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
