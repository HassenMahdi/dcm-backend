import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectorAWSS3SetupComponent } from './connector-awss3-setup.component';

describe('ConnectorAWSS3SetupComponent', () => {
  let component: ConnectorAWSS3SetupComponent;
  let fixture: ComponentFixture<ConnectorAWSS3SetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectorAWSS3SetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectorAWSS3SetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
